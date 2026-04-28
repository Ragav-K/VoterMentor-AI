import { ElectionStep, StepContent, QuizQuestion } from './types.ts';

export const ELECTION_STEPS: ElectionStep[] = [
  ElectionStep.ELIGIBILITY,
  ElectionStep.REGISTRATION,
  ElectionStep.NOMINATION,
  ElectionStep.CAMPAIGN,
  ElectionStep.VOTING,
  ElectionStep.COUNTING,
];

export const QUIZ_DATA: Record<ElectionStep, QuizQuestion[]> = {
  [ElectionStep.ELIGIBILITY]: [
    {
      question: 'In most countries, what is the minimum age to be eligible to vote?',
      options: ['16 years', '18 years', '21 years'],
      correctIndex: 1,
      explanation: 'While some countries vary, 18 is the most common age requirement for voting globally.',
    },
    {
      question: 'Besides age, what is another common requirement for national elections?',
      options: ['Owning property', 'Citizenship', 'Being employed'],
      correctIndex: 1,
      explanation: 'Citizenship is a nearly universal requirement for voting in national or federal elections.',
    },
    {
      question: 'Can mental incapacity be a ground for disqualification from voting?',
      options: ['Always', 'Never', 'In some jurisdictions, depending on local laws'],
      correctIndex: 2,
      explanation: 'Laws vary, but some regions have specific rules regarding legal mental capacity and voting rights.',
    }
  ],
  [ElectionStep.REGISTRATION]: [
    {
      question: 'Why is voter registration important?',
      options: ['To pick a winner early', 'To ensure only eligible people vote', 'To collect taxes'],
      correctIndex: 1,
      explanation: 'Registration ensures that only people who meet the legal criteria are on the electoral roll.',
    },
    {
      question: 'Can you register to vote on the same day as the election in all countries?',
      options: ['Yes, always', 'No, deadlines vary by jurisdiction', 'Registration is not required anywhere'],
      correctIndex: 1,
      explanation: 'Many places have cut-off dates weeks before the election, though some regions allow same-day registration.',
    },
    {
      question: 'What is a "Voter ID" card used for?',
      options: ['To get a discount at stores', 'To prove identity and eligibility at the polls', 'To keep track of how many times you voted'],
      correctIndex: 1,
      explanation: 'Voter ID cards help officials confirm that you are the person registered on the electoral roll.',
    }
  ],
  [ElectionStep.NOMINATION]: [
    {
      question: 'What is a "candidate"?',
      options: ['A person who counts the votes', 'A person running for office', 'A person who organizes the party'],
      correctIndex: 1,
      explanation: 'A candidate is an individual who is competing for a position in an election.',
    },
    {
      question: 'What is often required for an independent candidate to be nominated?',
      options: ['Permission from the king', 'A specific number of signatures', 'A high school diploma'],
      correctIndex: 1,
      explanation: 'Independent candidates usually need to show community support through a collection of signatures from eligible voters.',
    },
    {
      question: 'Can a person with a criminal record always be a candidate?',
      options: ['Yes, in every country', 'No, eligibility for office varies by local law', 'Only if they are rich'],
      correctIndex: 1,
      explanation: 'Qualifications for holding office often include rules about criminal history, though these vary widely.',
    }
  ],
  [ElectionStep.CAMPAIGN]: [
    {
      question: 'What is a "party manifesto"?',
      options: ['A guest list for a party', 'A document detailing a party\'s plans', 'A list of voting stations'],
      correctIndex: 1,
      explanation: 'A manifesto is a public declaration of policy and aims, issued before an election by a political party.',
    },
    {
      question: 'What is a "campaign blackout" period?',
      options: ['A power outage', 'A ban on campaigning right before the election', 'A time when candidates wear black'],
      correctIndex: 1,
      explanation: 'Blackout periods are designed to give voters a quiet time to reflect without active persuasion from candidates.',
    },
    {
      question: 'What is "political canvassing"?',
      options: ['Painting portraits of leaders', 'Contacting voters directly to gain support', 'Counting the number of posters in a street'],
      correctIndex: 1,
      explanation: 'Canvassing involves door-to-door visits, phone calls, or direct outreach to engage with potential voters.',
    }
  ],
  [ElectionStep.VOTING]: [
    {
      question: 'What does "ballot secrecy" mean?',
      options: ['The results are never released', 'Nobody knows how you voted', 'Only the police know your vote'],
      correctIndex: 1,
      explanation: 'Secrecy ensures that voters can cast their vote without fear of intimidation or pressure.',
    },
    {
      question: 'What is a "spoiled ballot"?',
      options: ['A ballot that smells bad', 'An incorrectly marked ballot that cannot be counted', 'A ballot with a secret mark that counts double'],
      correctIndex: 1,
      explanation: 'A spoiled or invalid ballot is one that is marked in a way that makes the voter\'s intent unclear or violates rules.',
    },
    {
      question: 'Where do you typically go to cast your vote in person?',
      options: ['A polling station', 'The candidate\'s house', 'The central bank'],
      correctIndex: 0,
      explanation: 'Polling stations are locations (like schools or community centers) set up specifically for voting.',
    }
  ],
  [ElectionStep.COUNTING]: [
    {
      question: 'What happens if an election is very close?',
      options: ['The first person to vote wins', 'A "recount" may be requested', 'They toss a coin immediately'],
      correctIndex: 1,
      explanation: 'In many jurisdictions, a very close result triggers an automatic or requested recount to ensure accuracy.',
    },
    {
      question: 'Who usually observes the counting process?',
      options: ['Only the winner', 'Independent observers and party representatives', 'Random tourists'],
      correctIndex: 1,
      explanation: 'Transparency is maintained by allowing observers and candidates\' representatives to watch the tallying.',
    },
    {
      question: 'What is an "exit poll"?',
      options: ['A survey of voters taken after they have left the polling station', 'The official final result', 'A poll to decide where the exit should be'],
      correctIndex: 0,
      explanation: 'Exit polls provide early estimates of the results based on how people say they voted as they leave.',
    }
  ],
};

export const STEP_CONTENT: Record<ElectionStep, StepContent> = {
  [ElectionStep.ELIGIBILITY]: {
    title: 'Step 1: Eligibility',
    description: 'Let’s check if you are allowed to vote.',
    beginnerInfo: 'Usually, you must be 18 years or older and a citizen of the country. It’s like checking if you are old enough to get a driver’s license!',
    intermediateInfo: 'Eligibility is the legal right to participate. Beyond age and citizenship, you typically must not be disqualified by law (e.g., due to certain criminal convictions or mental incapacity).',
    advancedInfo: 'Eligibility criteria can vary significantly. In some countries, non-citizen residents can vote in local elections. Legal challenges often arise around disenfranchisement laws.',
    nextSteps: ['Check My Eligibility', 'Move to Registration'],
    lesson: {
      fact: 'In some places, you can pre-register to vote at age 16 or 17!',
      actionPrompt: 'Check your local government website for pre-registration rules.'
    }
  },
  [ElectionStep.REGISTRATION]: {
    title: 'Step 2: Voter Registration',
    description: 'Getting your name on the official list.',
    beginnerInfo: 'Just like signing up for a new school or a club, you need to tell the government you want to vote so they can prepare your ballot.',
    intermediateInfo: 'Registration involves verifying your identity and residency. In many places, this generates a voter ID card or adds you to the electoral roll.',
    advancedInfo: 'Registration systems range from automatic enrollment to mandatory active registration. Issues like purging voter rolls are key areas of policy debate.',
    nextSteps: ['Find Registration Office', 'Move to Nomination'],
    lesson: {
      fact: 'Voter registration lists are often used for jury duty selection too!',
      actionPrompt: 'Look up the registration deadline for your next upcoming election.'
    }
  },
  [ElectionStep.NOMINATION]: {
    title: 'Step 3: Candidate Nomination',
    description: 'Deciding who can be chosen.',
    beginnerInfo: 'This is when people who want to be leaders put their names forward. It’s like students volunteering for class president.',
    intermediateInfo: 'Candidates must meet specific qualifications and often need to pay a deposit or collect a certain number of signatures to be officially "nominated".',
    advancedInfo: 'The nomination process dictates the diversity of the political field. Different systems (primaries vs. appointments) influence the general election.',
    nextSteps: ['How to Run for Office', 'Move to Campaign Period'],
    lesson: {
      fact: '"Write-in" candidates can sometimes win, even if they aren\'t on the printed ballot.',
      actionPrompt: 'Discover the qualifications needed to run for local council in your city.'
    }
  },
  [ElectionStep.CAMPAIGN]: {
    title: 'Step 4: Campaign Period',
    description: 'Candidates sharing their ideas.',
    beginnerInfo: 'Candidates make speeches, put up posters, and talk to people to explain what they will do if they win. It’s their chance to win your vote.',
    intermediateInfo: 'Campaigning is regulated to ensure fairness. This includes rules on spending, advertising, and "blackout" periods before the vote.',
    advancedInfo: 'Modern campaigning involves complex data analytics and targeting. Political communication strategies are crucial for mobilizing the electorate.',
    nextSteps: ['Read Party Manifestos', 'Move to Voting Day'],
    lesson: {
      fact: 'Some countries ban polling or campaigning 24 hours before the election to allow "reflection time".',
      actionPrompt: 'Find a non-partisan voter guide to compare candidate platforms.'
    }
  },
  [ElectionStep.VOTING]: {
    title: 'Step 5: Voting Day',
    description: 'The moment you make your choice.',
    beginnerInfo: 'You go to a polling station, get a ballot, mark your choice in secret, and put it in a box. Your voice counts!',
    intermediateInfo: 'Polling stations are staffed by neutral officials. You mark your ballot in a private booth to ensure your vote is secret.',
    advancedInfo: 'Voting methods include paper ballots, machines, or mail-in. Ensuring "ballot secrecy" and "one person, one vote" is the cornerstone of democratic integrity.',
    nextSteps: ['Find Polling Station', 'Move to Results'],
    lesson: {
      fact: 'The "Secret Ballot" is also known as the Australian Ballot because it was first used there in 1856.',
      actionPrompt: 'Double-check if you need to bring a specific form of ID to the polls.'
    }
  },
  [ElectionStep.COUNTING]: {
    title: 'Step 6: Counting & Results',
    description: 'Finding out who won.',
    beginnerInfo: 'After the voting ends, everyone’s choices are added up. The person or party with the most votes wins!',
    intermediateInfo: 'Counting is a transparent process, often observed by party representatives and monitors to ensure every valid vote is included.',
    advancedInfo: 'Results can be determined by FPTP or Proportional Representation. In complex systems, calculation can take days or weeks.',
    nextSteps: ['Understand the Result', 'End Journey'],
    lesson: {
      fact: 'In a "hung parliament," two or more parties must agree to work together to form a government.',
      actionPrompt: 'Learn how your specific system translates votes into seats.'
    }
  },
};
