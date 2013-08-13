# Vorschlag -> Debatte
# Gruppe -> Thema
# Argument -> Kommentar

# Sometimes it is not easyto decide. In those cases we should
# replace the string with `CHECK/possibility1/.../` so we can
# decide manually.

sed -i de/LC_MESSAGES/adhocracy.po \
-e 's/evor ein Vorschlag aktiviert wird, muss dieser/evor eine Debatte aktiviert wird, muss diese/g' \
-e 's/Gruppe erfolgreich angelegt. Sie können diese/Thema erfolgreich angelegt. Sie können dieses/g' \
-e 's/Über diesen Vorschlag wird gerade abgestimmt, er/Über diese Debatte wird gerade abgestimmt, sie/g' \
-e 's/einen eigenen, neuen Vorschlag/eine eigene, neue Debatte/g' \
-e 's/von der Gruppe eingebrachten Beschlüsse/zu dem Thema eingebrachten Beschlüsse/g' \
-e 's/Aktivität beim Vorschlag %s/Aktivität bei Debatte %s/g' \
-e 's/des Vorschlagstitels/des Debattentitels/g' \
-e 's/Vorschläge/Debatten/g' \
-e 's/einen neuen Vorschlag/eine neue Debatte/g' \
-e 's/der Vorschlag\([ ".,;:!?<]\)/die Debatte\1/g' \
-e 's/Der Vorschlag\([ ".,;:!?<]\)/Die Debatte\1/g' \
-e 's/zum Vorschlag\([ ".,;:!?<]\)/zur Debatte\1/g' \
-e 's/es Vorschlags\([ ".,;:!?<]\)/er Debatte\1/g' \
-e 's/den Vorschlag\([ ".,;:!?<]\)/die Debatte\1/g' \
-e 's/ein Vorschlag\([ ".,;:!?<]\)/eine Debatte\1/g' \
-e 's/en Vorschlag\([ ".,;:!?<]\)/e Debatte\1/g' \
-e 's/er Vorschlag\([ ".,;:!?<]\)/e Debatte\1/g' \
-e 's/Vorschlag/Debatte/g' \
\
-e 's/von einer anderen Gruppe/von einem anderen Thema/g' \
-e 's/Beschreiben Sie die Ziele dieser Gruppe und wer ihre Mitglieder sind./Beschreiben Sie die Ziele dieses Themas und wer die Mitglieder sind./g' \
-e 's/von der Gruppe\([ ".,;:!?<]\)/von dem Thema\1/g' \
-e 's/erlaubte Gruppe\([ ".,;:!?<]\)/erlaubtes Thema\1/g' \
-e 's/Gruppen/Themen/g' \
-e 's/die Gruppe\([ ".,;:!?<]\)/das Thema\1/g' \
-e 's/Die Gruppe\([ ".,;:!?<]\)/Das Thema\1/g' \
-e 's/eine Instanz-Gruppe\([ ".,;:!?<]\)/ein Instanz-Thema\1/g' \
-e 's/eine Gruppe\([ ".,;:!?<]\)/ein Thema\1/g' \
-e 's/er Gruppe bei/em Thema bei/g' \
-e 's/er Gruppe \(..%s..\) bei/em \1 Thema bei/g' \
-e 's/in dieser Gruppe/in diesem Thema/g' \
-e 's/bei dieser Gruppe/bei diesem Thema/g' \
-e 's/\(Mitglieder\|Startseite\|Beschlüsse\|Mitgliederliste\|Name\|URL\|Aussehen\|Mitgliederzahl\|Arbeitsgrundlage\|Debatten\|Termine\|Ziele\) d\(ies\)\?er Gruppe/\1 d\2es Themas/g' \
-e 's/einer Gruppe\([ ".,;:!?<]\)/eines Themas\1/g' \
-e 's/dieser Gruppen\([ ".,;:!?<]\)/dieser Themen\1/g' \
-e 's/er Gruppe/CHECK\/em Thema\/es Themas\//g' \
-e 's/diese Gruppe\([ ".,;:!?<]\)/dieses Thema\1/g' \
-e 's/Neue Gruppe\([ ".,;:!?<]\)/Neues Thema\1/g' \
-e 's/zur Gruppe\([ ".,;:!?<]\)/zum Thema\1/g' \
-e 's/Gruppe/Thema/g' \
-e 's/verteilte, offene Themen/verteilte, offene Gruppen/' \
\
-e 's/Argumente/Kommentare/g' \
-e 's/des Arguments/des Kommentars/g' \
-e 's/n Argument/nen Kommentar/g' \
-e 's/s Argument\([":]\)/r Kommentar\1/g' \
-e 's/s Argument \(wurde\)/r Kommentar \1/g' \
-e 's/s Argument \(entfernen\|bearbeiten\)/n Kommentar \1/g' \
-e 's/\([^%]\)s Argument/\1CHECK\/r Kommentar\/n Kommentar\//g' \
-e 's/Argument/Kommentar/g' \
-e 's/msgid \(.*\)Kommentar\(.*\)/msgid \1Argument\2/g'
