# Eingabeaufforderung für den Nutzer
$name = Read-Host "Geben Sie den Asset-Namen ein (z. B. Laptop)"
$type = Read-Host "Geben Sie den Typ ein (z. B. Elektronik)"
$location = Read-Host "Geben Sie den Standort ein (z. B. Hauptgebaeude)"
$status = Read-Host "Geben Sie den Status ein (Standard: In Betrieb)"
$assignedTo = Read-Host "Geben Sie die zugewiesene Person ein (oder leer lassen)"

# Falls keine Eingaben erfolgen, Abbruch mit Fehlermeldung
if ([string]::IsNullOrWhiteSpace($name) -or [string]::IsNullOrWhiteSpace($type) -or [string]::IsNullOrWhiteSpace($location)) {
    Write-Host "❌ Fehler: Name, Typ und Standort müssen ausgefüllt sein!" -ForegroundColor Red
    exit
}

# Standardwerte setzen, falls keine Eingaben gemacht wurden
if ([string]::IsNullOrWhiteSpace($status)) { $status = "In Betrieb" }
if ([string]::IsNullOrWhiteSpace($assignedTo)) { $assignedTo = "Unassigned" }

# JSON-Objekt erstellen
$body = @{
    name = $name
    type = $type
    location = $location
    status = $status
    assignedTo = $assignedTo
} | ConvertTo-Json -Depth 10

# Asset per REST-API anlegen
$response = Invoke-RestMethod -Uri "http://localhost:3000/api/assets" -Method Post -Headers @{"Content-Type"="application/json"} -Body $body

# Erfolgreiche Ausgabe
Write-Host "`n✅ Asset erfolgreich hinzugefügt! (ID: $($response.assetId))" -ForegroundColor Green

# Prüfen, ob die Anfrage erfolgreich war
if ($response) {
    Write-Host "✅ Asset erfolgreich hinzugefügt! (ID: $($response.assetId))" -ForegroundColor Green
} else {
    Write-Host "❌ Fehler beim Hinzufügen des Assets!" -ForegroundColor Red
}

# Fenster offen halten, damit die Meldung sichtbar bleibt
Read-Host "Drücken Sie die Eingabetaste, um das Fenster zu schließen..."
