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

p

EOF
