# Benutzername und Passwort abfragen
$username = Read-Host "Geben Sie den Benutzernamen ein"
$password = Read-Host "Geben Sie das Passwort ein" -AsSecureString
$unsecurePassword = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto([System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($password))

# JSON Body für die Anfrage
$registerBody = @{
    "username" = $username
    "password" = $unsecurePassword
} | ConvertTo-Json -Compress

# API-Endpoint
$url = "http://localhost:3000/api/users/register"

# HTTP-POST Anfrage senden
try {
    $response = Invoke-RestMethod -Uri $url -Method Post -Headers @{"Content-Type"="application/json"} -Body $registerBody
    Write-Host "`n✅ Benutzer wurde erfolgreich registriert!"
} catch {
    Write-Host "`n❌ Fehler bei der Registrierung: $_"
}

# Benutzer muss eine Taste drücken, bevor das Fenster geschlossen wird
Write-Host "`nDrücken Sie eine beliebige Taste, um das Fenster zu schließen..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
