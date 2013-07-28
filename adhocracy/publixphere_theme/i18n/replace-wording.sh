# Vorschlag -> Debatte
# Gruppe -> Thema

sed -i de/LC_MESSAGES/adhocracy.po \
-e "s/Vorschläge/Debatten/g" \
-e "s/es Vorschlags/er Debatte/g" \
-e "s/den Vorschlag/die Debatte/g" \
-e "s/einen Vorschlag/eine Debatte/g" \
-e "s/diesen Vorschlag/diese Debatte/g" \
-e "s/er Vorschlag/e Debatte/g" \
-e "s/Vorschlag/Debatte/g" \
-e "s/die Gruppe/das Thema/g" \
-e "s/eine Gruppe/ein Thema/g" \
-e "s/der Gruppe bei/dem Thema bei/g" \
-e "s/der Gruppe/des Themas/g" \
-e "s/einer Gruppe/eines Themas/g" \
-e "s/dieser Gruppe/diesem Thema/g" \
-e "s/diese Gruppe/dieses Thema/g" \
-e "s/Gruppen/Themen/g" \
-e "s/Gruppe/Thema/g" \

