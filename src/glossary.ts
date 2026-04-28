import { SupportedLanguage } from './types';

export interface GlossaryEntry {
  term: string;
  definition: string;
}

export const GLOSSARY: Record<SupportedLanguage, Record<string, string>> = {
  EN: {
    constituency: "A group of voters in a specified area who elect a representative to a legislative body.",
    ballot: "A process of voting, in writing and typically in secret.",
    manifesto: "A public declaration of policy and aims, especially one issued before an election by a political party or candidate.",
    electoral_roll: "An official list of the people in a particular area who are entitled to vote in an election.",
    polling_station: "A building where people go to vote in an election.",
    candidate: "A person who applies for a job or is nominated for election.",
    nomination: "The action of nominating or state of being nominated for an office.",
    disenfranchisement: "The state of being deprived of a right or privilege, especially the right to vote.",
    ballot_secrecy: "The principle that a voter's choice in an election is confidential, preventing attempts to influence the voter by intimidation, blackmailing, or vote buying.",
    fptp: "First Past The Post - an electoral system where the candidate with the most votes wins, even if they don't have a majority.",
    proportional_representation: "An electoral system in which parties gain seats in proportion to the number of votes cast for them."
  },
  ES: {
    constituency: "Distrito electoral: un grupo de votantes en un área específica que elige a un representante.",
    ballot: "Papeleta: un proceso de votación, por escrito y generalmente en secreto.",
    manifesto: "Manifiesto: una declaración pública de políticas y objetivos emitida antes de una elección.",
    electoral_roll: "Censo electoral: una lista oficial de las personas con derecho a voto.",
    polling_station: "Colegio electoral: un edificio donde la gente va a votar.",
    candidate: "Candidato: una persona che compite en una elección.",
    nomination: "Nominación: el acto de proponer a alguien para un cargo.",
    disenfranchisement: "Privación de derechos: el estado de ser privado de un derecho, especialmente el de voto.",
    ballot_secrecy: "Secreto del voto: El principio de que la elección del votante es confidencial para evitar intimidación o compra de votos.",
    fptp: "Sistema mayoritario: sistema donde gana el candidato con más votos.",
    proportional_representation: "Representación proporcional: los partidos ganan escaños en proporción a los votos recibidos."
  },
  FR: {
    constituency: "Circonscription : Un groupe d'électeurs dans une zone spécifiée qui élit un représentant.",
    ballot: "Bulletin de vote : Un processus de vote, par écrit et généralement secret.",
    manifesto: "Manifeste : Une déclaration publique de politique et d'objectifs publiée avant une élection.",
    electoral_roll: "Liste électorale : Une liste officielle des personnes autorisées à voter.",
    polling_station: "Bureau de vote : Un bâtiment où les gens vont voter.",
    candidate: "Candidat : Une personne qui se présente à une élection.",
    nomination: "Nomination : L'acte de proposer quelqu'un pour un poste.",
    disenfranchisement: "Privation de droits : Le fait d'être privé d'un droit, en particulier le droit de vote.",
    ballot_secrecy: "Secret du vote : Le principe selon lequel le choix de l'électeur est confidentiel pour éviter toute pression.",
    fptp: "Scrutin uninominal majoritaire à un tour : Le candidat ayant reçu le plus de voix gagne.",
    proportional_representation: "Représentation proportionnelle : Les partis obtiennent des sièges proportionnellement au nombre de voix."
  },
  DE: {
    constituency: "Wahlkreis: Eine Gruppe von Wählern in einem bestimmten Gebiet, die einen Vertreter wählen.",
    ballot: "Stimmzettel: Ein Wahlvorgang, schriftlich und in der Regel geheim.",
    manifesto: "Manifest: Eine öffentliche Erklärung von Zielen, die vor einer Wahl veröffentlicht wird.",
    electoral_roll: "Wählerverzeichnis: Eine offizielle Liste der wahlberechtigten Personen.",
    polling_station: "Wahllokal: Ein Gebäude, in dem die Menschen zur Wahl gehen.",
    candidate: "Kandidat: Eine Person, die sich um ein Amt bewirbt.",
    nomination: "Nominierung: Der Akt der Benennung für ein Amt.",
    disenfranchisement: "Entzug des Wahlrechts: Der Zustand, eines Rechts beraubt zu sein.",
    ballot_secrecy: "Wahlgeheimnis: Der Grundsatz, dass die Wahlentscheidung vertraulich ist, um Beeinflussung zu verhindern.",
    fptp: "Mehrheitswahlrecht: Das System, bei dem der Kandidat mit den meisten Stimmen gewinnt.",
    proportional_representation: "Verhältniswahl: Parteien erhalten Sitze entsprechend ihrem Stimmenanteil."
  },
  IT: {
    constituency: "Circoscrizione: Un gruppo di elettori in un'area specifica che elegge un rappresentante.",
    ballot: "Scheda elettorale: Un processo di voto, scritto e tipicamente segreto.",
    manifesto: "Manifesto: Una dichiarazione pubblica di obiettivi emessa prima di un'elezione.",
    electoral_roll: "Liste elettorali: Un elenco ufficiale delle persone aventi diritto al voto.",
    polling_station: "Seggio elettorale: Un edificio dove le persone vanno a votare.",
    candidate: "Candidato: Una persona che si candida per un'elezione.",
    nomination: "Nomina: L'atto di proporre qualcuno per un ufficio.",
    disenfranchisement: "Privazione del diritto di voto: Lo stato di essere privato di un diritto.",
    ballot_secrecy: "Segretezza del voto: Il principio secondo cui la scelta dell'elettore è riservata per prevenire intimidazioni.",
    fptp: "Sistema maggioritario: Il candidato con più voti vince.",
    proportional_representation: "Rappresentanza proporzionale: I partiti ottengono seggi in proporzione ai voti."
  },
  PT: {
    constituency: "Circunscrição: Um grupo de eleitores em uma área específica que elege um representante.",
    ballot: "Cédula: Um processo de votação, por escrito e geralmente secreto.",
    manifesto: "Manifesto: Uma declaração pública de políticas e objetivos emitida antes de uma eleição.",
    electoral_roll: "Caderno eleitoral: Uma lista oficial das pessoas com direito a voto.",
    polling_station: "Local de votação: Um edifício onde as pessoas vão votar.",
    candidate: "Candidato: Uma pessoa que concorre a uma eleição.",
    nomination: "Nomeação: O ato de indicar alguém para um cargo.",
    disenfranchisement: "Privação de direitos: O estado de ser privado de um direito, especialmente o voto.",
    ballot_secrecy: "Sigilo do voto: O princípio de que a escolha do eleitor é confidencial para evitar coação.",
    fptp: "Voto majoritário: O candidato com mais votos vence.",
    proportional_representation: "Representação proporcional: Partidos ganham assentos proporcionalmente aos votos."
  },
  JA: {
    constituency: "選挙区：代表者を選出する特定の地域の有権者のグループ。",
    ballot: "投票：通常は秘密裏に行われる書面による投票プロセス。",
    manifesto: "マニフェスト：選挙前に政党や候補者が発表する公約や目標の公式宣言。",
    electoral_roll: "選挙人名簿：特定の地域で投票権を持つ人々の公式リスト。",
    polling_station: "投票所：選挙で投票するために人々が行く建物。",
    candidate: "候補者：選挙に立候補している人。",
    nomination: "指名：公職に推薦されること。",
    disenfranchisement: "公民権剥奪：権利（特に投票権）を奪われている状態。",
    ballot_secrecy: "投票の秘密：威圧や買収を防ぐために、有権者の選択を機密にする原則。",
    fptp: "小選挙区制：最多得票を得た候補者が当選する選挙制度。",
    proportional_representation: "比例代表制：得票数に応じて議席を獲得する選挙制度。"
  },
  RU: {
    constituency: "Избирательный округ: Группа избирателей на определенной территории, выбирающая представителя.",
    ballot: "Бюллетень: Процесс голосования, письменно и, как правило, тайно.",
    manifesto: "Манифест: Публичная декларация политики и целей, выпускаемая перед выборами.",
    electoral_roll: "Список избирателей: Официальный список лиц, имеющих право голоса.",
    polling_station: "Избирательный участок: Здание, где проходит голосование.",
    candidate: "Кандидат: Лицо, претендующее на выборную должность.",
    nomination: "Выдвижение: Акт предложения кандидатуры на должность.",
    disenfranchisement: "Лишение прав: Состояние лишения прав или привилегий, особенно права голоса.",
    ballot_secrecy: "Тайна голосования: Принцип, согласно которому выбор избирателя является конфиденциальным для предотвращения давления.",
    fptp: "Мажоритарная система: Система, при которой побеждает кандидат, набравший больше всего голосов.",
    proportional_representation: "Пропорциональное представительство: Партии получают места пропорционально числу голосов."
  }
};
