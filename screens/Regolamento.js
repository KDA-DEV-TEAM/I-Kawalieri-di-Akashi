import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Header from '../components/Header'; // Assicurati che il percorso sia corretto
import NavBar from '../components/NavBar'; // Assicurati che il percorso sia corretto

const Regolamento = () => {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Regolamento del Gruppo</Text>

        <Text style={styles.text}>
          <Text style={styles.subTitle}>Contestazioni</Text>
          {"\n"}L’operato dei moderatori è insindacabile e può essere giudicato solo dagli Amministratori del gruppo.
          {"\n"}Eventuali contestazioni vanno effettuate tramite i messaggi interni (messenger) e comunque in forma privata. Verrà immediatamente chiusa ogni discussione avente come oggetto argomenti di contestazione in chiave polemica. Chi dovesse insistere in simile atteggiamento, verrà immediatamente allontanato dal gruppo secondo l’insindacabile giudizio dei moderatori dopo benestare degli amministratori.
          {"\n\n"}

          <Text style={styles.subTitle}>Chiusura discussioni</Text>
          {"\n"}Verrà chiusa ogni discussione dove argomenti o toni non risultino idonei alla linea del gruppo (vedi sopra). Se nel corso della discussione il post dovesse degenerare (anche con un solo messaggio) è data ampia facoltà di intervenire al moderatore come ritiene opportuno, anche con la chiusura della discussione e nei casi più gravi con la sospensione dell’utente per 7 giorni (in caso sia recidivo con l’espulsione, previo benestare degli Amministratori).
          {"\n"}Per le violazioni meno gravi, ad insindacabile giudizio del moderatore, l’utente sarà contattato in privato e invitato a rimuovere i contenuti. E’ espressamente vietato bloccare gli Amministratori e i Moderatori, gli utenti che pongono in atto tale azione saranno espulsi dal gruppo.
          {"\n\n"}

          <Text style={styles.subTitle}>Dispute personali tra utenti</Text>
          {"\n"}Non è ammesso rendere pubbliche le conversazioni private. Non è ammesso utilizzare il gruppo per dispute personali di ogni genere tra utenti, a tale scopo esistono i messaggi privati. Qualora questo si dovesse verificare, la discussione verrà immediatamente cancellata o chiusa.
          {"\n"}In caso di recidività da parte dello stesso utente e qualora non dovessero avere effetto i richiami dei moderatori, il responsabile verrà bannato dal gruppo.
          {"\n\n"}

          <Text style={styles.subTitle}>Espulsione utenti</Text>
          {"\n"}Ogni utente è responsabile dei contenuti dei propri post (messaggi), decidendo di renderli pubblici e inviandoli al gruppo non potrà più considerare i suoi scritti “privati”, potrà però modificarli o rimuoverli.
          {"\n"}Se espulso non potrà richiedere la cancellazione di tutti i suoi messaggi, questo renderebbe impossibile la lettura delle discussioni in cui è intervenuto o provocherebbe la cancellazione di intere discussioni, ledendo gli altri partecipanti.
          {"\n"}Qualora un utente venga espulso dal gruppo non può riscriversi con altro nickname; su questo gruppo non vengono bannati i nickname ma le persone, per evidenti ragioni. Qualora un utente espulso si riscriva al gruppo e venga scoperto dai moderatori o dagli amministratori, verrà nuovamente espulso. Qualora questo utente continui a rischiversi, con l’unico fine di contestare e ostacolare il regolare svolgimento dei post sul gruppo si procederà con la segnalazione all’autorità competente e al provider utilizzato (nei casi previsti dalla legge, è possibile far ricorso al riconoscimento IP).
          {"\n\n"}

          <Text style={styles.subTitle}>Protezione del marchio</Text>
          {"\n"}Il marchio dei “I Kawalieri di Akashi” è protetto da copyright e depositato presso il Ministero delle Imprese e del Made in Italy (MIMIT). Non è consentito utilizzare il marchio a scopi commerciali né per finalità organizzative (gruppi, chat, associazioni, siti web, raduni, eventi pubblici), senza autorizzazione scritta da far pervenire agli amministratori. Per tutte le informazioni in merito e per i gadget riservati ai soci si prega di consultare il sito web www.ikawalieridiakashi.it.
          {"\n\n"}

          <Text style={styles.subTitle}>Accettazione Regolamento</Text>
          {"\n"}La presenza di queste norme di comportamento vuole spronare gli utenti ad una discussione seria, civile e nel rispetto delle opinioni altrui. Durante le discussioni è possibile giungere a situazioni di contrasto e scontro: si richiama ogni utente del gruppo alla massima attenzione, in quanto la discussione anche animata e con scontro di opinioni è ammessa ma non l’insulto personale, tantomeno ogni tentativo di denigrare le opinioni altrui se differenti dalle proprie. Tali comportamenti non verranno in alcun modo tollerati da parte dello staff. Le discussioni offensive verranno chiuse o eliminate e se il caso, gli utenti responsabili di comportamenti scorretti verranno sospesi o espulsi nei casi più gravi.
          {"\n"}Lo spirito delle regole non è limitare la libertà di pensiero di chi vi partecipa ma è finalizzato alla tutela dei temi trattati e soprattutto alla tutela dei partecipanti.
          {"\n"}“Nel gruppo non censuriamo i pensieri, ma censuriamo i modi con cui questi si esprimono!”
          {"\n\n"}

          <Text style={styles.subTitle}>Conclusione</Text>
          {"\n"}Leggete attentamente questa pagina: la conoscenza ed il rispetto di queste semplici regole sono fondamentali per il buon funzionamento di questo gruppo.
          {"\n"}Lo staff.
        </Text>
      </ScrollView>
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    flex: 1,
    margin: 20,
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  text: {
    color: 'white',
    fontSize: 16,
    lineHeight: 22,
  },
});

export default Regolamento;

