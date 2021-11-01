# Parking baza podataka

Autor: Luka Čičak

Verzija: 1.0

Jezik: postgresql

Licenca: GNU General Public License je najšire korištena licenca za slobodan softver, koju je originalno kreirao Richard Stallman za projekt GNU, a o kojoj se danas    brine Free software foundation (FSF). GPL je napisan tako da sačuva slobode korisnika softvera: pravo na korištenje u bilo koju svrhu, pravo na izradu kopija i       pravo na proučavanje, mijenjanje i redistribuciju modificiranog programa. GNU GPL je, copyleft licenca, što znači da zahtjeva da sav softver koji nastane kao         modifikacija ovog softvera, također garantira iste slobode (tj. bude distribuiran pod istom licencom), a za razliku od srodne LGPL licence, to se odnosi i na        onaj softver koji se koristi u sprezi s njime.

Atributi: 
(Entitet Parking) 
- ID - identifikator parkinga, primarni ključ, za svaki parking jedinstven, ne smije biti NULL, INTEGER
- imeParkinga - ime parkinga, ne mora biti jednistveno, ne smije biti NULL, VARCHAR
- brojMjesta - ukupni broj mjesta na nekom parkingu, uključuje i invalidska mjesta, ne smije biti NULL, INTEGER
- brojInvalidskihMjesta - ukupan broj svih invalidskih mjesta, ne smije biti NULL, moze biti 0, INTEGER 
- vrsta - vrsta parkinga, dozvoljene vrijednosti su: [automobilski, kamionski, autobusni, biciklistički, mješoviti], ne smije biti NULL, VARCHAR
- zona - vrsta parkirne zone, podatak iz strane tablice, prikazuje se ID zone, ne smije biti NULL, VARCHAR 
- županija - županija u kojoj se nalazi parking, ne smije biti NULL, VARCHAR
- grad -  grad u kojem se nalazi parking, ne smije biti NULL, VARCHAR
- kvart - kvart u kojem se nalazi parking, ne smije biti NULL, VARCHAR
- ulica - ulica u kojoj se nalazi parking, ne smije biti NULL, VARCHAR
- kućniBroj - kućni broj ulice u kojoj se nalazi parking, ne smije biti NULL, VARCHAR
 
(Entitet Zona) 
- zona - identifikator zone, za svaku zonu jedninstven, primarni ključ, ne smije biti NULL, VARCHAR
- dnevnaKarta - cijena dnevne karte za zonu, izražena u KN, ne smije biti NULL, FLOAT
- pozivniBroj - telefonski broj preko kojeg se plaća zona, ne mora biti jedinstven, ne smije biti NULL, INTEGER
                          
Dodatno
  - identifikator zone je varchar umjesto integera zato što je klasifikacija zona takva da postoje zone 'I.1 zona' i 'I.2 zona'
  - pozivni broj također nije jedinstven zbog klasifikacije zona, zone 'I.1 zona' i 'I.2 zona' imaju isti pozivni broj jer su varijacije 1.zone
