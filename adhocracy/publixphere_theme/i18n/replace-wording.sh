#!/bin/sh

# Vorschlag -> Diskussion
# Kategorie -> Thema

exec sed -i -n -f - de/LC_MESSAGES/adhocracy.po << EOF

s/Keine zugewiesene Kategorie/Kein zugewiesenes Thema/g
s/keiner Kategorie/keinem Thema/g
s/Dieser\(.*\)Kategorie/Diesem\1Thema/g
s/in dieser Kategorie/in diesem Thema/g
s/dieser Kategorie/dieses Themas/g
s/diese Kategorie/dieses Thema/g
s/eine neue Kategorie/ein neues Thema/g
s/keiner Kategorie/keinem Thema/g
s/die Kategorien/die Themen/g
s/die Kategorie/das Thema/g
s/der Kategorie/des Themas/g
s/Die \(.*\) Kategorie/Das \1 Thema/g
s/Kategorien/Themen/g
s/kategorien/themen/g
s/kategorie/thema/g
s/"Kategorie"/"Thema"/g

s/nach verschiedenen Themen sortieren/nach verschiedenen Kategorien sortieren/g

s/Über diesen Vorschlag wird gerade abgestimmt, er kann daher nicht verändert werden./Über diese Diskussion wird gerade abgestimmt, sie kann daher nicht verändert werden./g
s/ein <b>gemeinsamer Vorschlag<\/b> der/eine <b>gemeinsame Diskussion<\/b> die/g
s/einen eigenen, neuen Vorschlag/eine eigene, neue Diskussion/g
s/des Vorschlagstitels/des Diskussionstitels/g
s/einen neuen Vorschlag/eine neue Diskussion/g
s/einen Vorschlag/eine Diskussion/g
s/kein Vorschlag/keine Diskussion/g
s/diesen Vorschlag/diese Diskussion/g
s/diesem Vorschlag/dieser Diskussion/g
s/Dieser Vorschlag/Diese Diskussion/g
s/dieser Vorschlag/diese Diskussion/g
s/eines Vorschlags/einer Diskussion/g
s/beim Vorschlag/bei der Diskussion/g
s/zum Vorschlag/zu der Diskussion/g
s/Der Vorschlag/Die Diskussion/g
s/der Vorschlag/die Diskussion/g
s/keinen Vorschlag/keine Diskussion/g
s/Ihres Vorschlags/Ihrer Diskussion/g
s/des Vorschlags/der Diskussion/g
s/den Vorschlag/die Diskussion/g
s/ganzen Vorschlag/ganze Diskussion/g
s/Neuer Vorschlag/Neue Diskussion/g
s/Neuen Vorschlag/Neue Diskussion/g
s/Geänderter Vorschlag/Geänderte Diskussion/g
s/Vorschlag/Diskussion/g
s/Vorschlägen/Diskussionen/g
s/Vorschläge/Diskussionen/g

s/Sie können später eine eigene Version dieses Beschlusses vorschlagen, um ihn zu ändern./Sie können später eine eigene Version dieser Position vorschlagen, um sie zu ändern./g
s/dem angegebenen Elternbeschluss/der angegebenen Elternposition/g
s/einen Beschluss aus, auf den/eine Position aus, auf die/g
s/einen Beschluss aus, den/eine Position aus, die/g
s/einen neuen Beschluss, auf den/eine neue Position, auf die/g
s/Beschlussabstimmung/Positionsabstimmung/g
s/Beschlussliste/Positionsliste/g
s/Beschlussübersicht/Positionsübersicht/g
s/einen vorhandenen Beschluss/eine vorhandene Position/g
s/einen bestehenden Beschluss/eine bestehende Position/g
s/ein ähnlicher Beschluss/eine ähnliche Position/g
s/Der neue Beschluss/Die neue Position/g
s/keinen passenden Beschluss/keine passende Position/g
s/einen neuen Beschluss/eine neue Position/g
s/den Beschluss/die Position/g
s/dieses Beschlusses/dieser Position/g
s/Dieser Beschluss/Diese Position/g
s/diesem Beschluss/dieser Position/g
s/neuer Beschluss/neue Position/g
s/Neuer Beschluss/Neue Position/g
s/einen Beschluss/eine Position/g
s/diesen Beschluss/diese Position/g
s/eines Beschlusses/einer Position/g
s/Einen neuen Beschluss/Eine neue Position/g
s/einem Beschluss/einer Position/g
s/des Beschlusses/der Position/g
s/dem Beschluss/der Position/g
s/Der Beschluss/Die Position/g
s/der Beschluss/die Position/g
s/Elternbeschluss/Elternposition/g
s/Beschluss/Position/g
s/Beschlüssen/Positionen/g
s/Beschlüsse/Positionen/g

s/Sie können sich mit verschiedenen externen Benutzerkonten anmelden. Bitte beachten Sie, dass die Anmeldung durch externe Anbieter riskant für Ihre Privatsphäre und Sicherheit sein kann./Du kannst dich mit verschiedenen externen Benutzerkonten anmelden. Bitte beachte, dass die Anmeldung durch externe Anbieter riskant für Deine Privatsphäre und Sicherheit sein kann./g
s/Um einen Account anzulegen, brauchen Sie nur einen Benutzernamen, ein Passwort und eine E-Mail-Adresse./Um einen Account anzulegen, brauchst du nur einen Benutzernamen, ein Passwort und eine E-Mail-Adresse./g
s/Bitte geben Sie Ihr Passwort ein:/Bitte gib Dein Passwort ein:/g
s/Bitte tragen Sie die Zeichen im folgenden Bild in das unten stehende Feld ein./Bitte trage die Zeichen im folgenden Bild in das unten stehende Feld ein./g

p

EOF
