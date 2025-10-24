<?php
// contact.php - Simple contact form handler for Hostinger (PHP + MySQL)
// Place this file on your hosting under public_html/api/contact.php

// --- BASIC CORS SUPPORT (adjust the domain as needed) ---
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '*';
header('Access-Control-Allow-Origin: ' . $origin);
header('Vary: Origin');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// --- CONFIG: EDIT THESE TO MATCH YOUR HOSTINGER DATABASE ---
$DB_HOST = getenv('DB_HOST') ?: 'localhost';
$DB_NAME = getenv('DB_NAME') ?: 'u209240529_Rdiamond';
$DB_USER = getenv('DB_USER') ?: 'u209240529_rdiamond';
$DB_PASS = getenv('DB_PASS') ?: 'Rdiamond@admin123';
$TABLE   = 'contact_messages';

// --- HELPER: JSON RESPONSE ---
function respond($ok, $message, $extra = []) {
    echo json_encode(array_merge([
        'success' => $ok,
        'message' => $message,
    ], $extra));
    exit;
}

// Require POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    respond(false, 'Method not allowed');
}

// Honeypot (simple spam prevention)
$honeypot = isset($_POST['website']) ? trim($_POST['website']) : '';
if ($honeypot !== '') {
    respond(true, 'Thanks!'); // pretend success
}

// Collect fields
$name    = isset($_POST['name'])    ? trim($_POST['name'])    : '';
$email   = isset($_POST['email'])   ? trim($_POST['email'])   : '';
$subject = isset($_POST['subject']) ? trim($_POST['subject']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';
$ip      = $_SERVER['REMOTE_ADDR'] ?? '';
$ua      = $_SERVER['HTTP_USER_AGENT'] ?? '';

// Basic validation
if ($name === '' || $email === '' || $message === '') {
    respond(false, 'Please fill in name, email, and message.');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'Please enter a valid email address.');
}

// Connect to DB (mysqli)
$mysqli = @new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
if ($mysqli->connect_errno) {
    http_response_code(500);
    respond(false, 'Database connection failed: ' . $mysqli->connect_error);
}
$mysqli->set_charset('utf8mb4');

// Ensure table exists (idempotent)
$createSql = "CREATE TABLE IF NOT EXISTS `$TABLE` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  `email` VARCHAR(200) NOT NULL,
  `subject` VARCHAR(255) NULL,
  `message` TEXT NOT NULL,
  `ip` VARCHAR(64) NULL,
  `user_agent` VARCHAR(512) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX (`email`),
  INDEX (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

if (!$mysqli->query($createSql)) {
    http_response_code(500);
    respond(false, 'Failed to ensure table exists: ' . $mysqli->error);
}

// Insert using prepared statement
$stmt = $mysqli->prepare("INSERT INTO `$TABLE` (`name`, `email`, `subject`, `message`, `ip`, `user_agent`) VALUES (?, ?, ?, ?, ?, ?)");
if (!$stmt) {
    http_response_code(500);
    respond(false, 'Failed to prepare statement: ' . $mysqli->error);
}
$stmt->bind_param('ssssss', $name, $email, $subject, $message, $ip, $ua);

if (!$stmt->execute()) {
    http_response_code(500);
    respond(false, 'Failed to save message: ' . $stmt->error);
}

$stmt->close();
$mysqli->close();

respond(true, 'Message sent successfully.');
?>