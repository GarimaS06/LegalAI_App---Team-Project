// script.js

document.addEventListener('DOMContentLoaded', function () {
    const generateBtn = document.getElementById('generateBtn');
    const swapBtn = document.getElementById('swapBtn');
    const simplifyBtn = document.getElementById('simplifyBtn');
    const caseInput = document.getElementById('caseInput');
    const plaintiffArguments = document.getElementById('plaintiffArguments');
    const defendantArguments = document.getElementById('defendantArguments');
    const verdictText = document.getElementById('verdictText');
    const gavelSound = document.getElementById('gavelSound');

    let currentArguments = {}; // to store current arguments
    let caseType = '';

    const legalArguments = {
        employment: {
            plaintiff: [
                { title: "Wrongful Termination", content: "Termination without notice violated Section 25F of Industrial Disputes Act.", simple: "They fired me without warning, which is against labor rules." },
                { title: "Unpaid Wages", content: "3 months of unpaid salary breaks Payment of Wages Act, 1936.", simple: "They didn’t pay me for 3 months, which is illegal." },
                { title: "Retaliation", content: "Fired after harassment complaint = illegal retaliation.", simple: "They fired me because I complained, which is unfair." }
            ],
            defendant: [
                { title: "Grounds for Termination", content: "Dismissed due to misconduct under Section 11.", simple: "They misbehaved, so we let them go fairly." },
                { title: "Wages Held Lawfully", content: "Salary withheld due to incomplete exit process.", simple: "We didn’t pay because they didn’t finish exit steps." },
                { title: "No Retaliation", content: "Termination initiated before complaint.", simple: "We decided to fire before the complaint happened." }
            ],
            verdictStrong: "The court finds in favor of the plaintiff due to labor violations.",
            verdictWeak: "The court finds in favor of the defendant due to documented procedures."
        },
        contract: {
            plaintiff: [
                { title: "Breach of Contract", content: "Services not delivered as per agreement Section 3.2.", simple: "They broke the promise in the deal." },
                { title: "Financial Loss", content: "Losses over ₹5L due to breach.", simple: "We lost money because they didn’t do their part." }
            ],
            defendant: [
                { title: "Force Majeure", content: "Delay caused by valid unforeseen issues.", simple: "It wasn’t our fault – unexpected problems happened." },
                { title: "No Major Breach", content: "Delays were minor, not major contract break.", simple: "It was a small delay, not a big deal." }
            ],
            verdictStrong: "Plaintiff wins due to clear breach and losses.",
            verdictWeak: "Defendant wins – breach wasn’t significant or covered by contract."
        },
        cyber: {
            plaintiff: [
                { title: "Unauthorized Access", content: "Violation of IT Act, 2000 by hacking system.", simple: "They hacked our system, which is a crime." },
                { title: "Data Theft", content: "Stolen data led to business loss.", simple: "They stole info which hurt our business." }
            ],
            defendant: [
                { title: "No Proof of Hacking", content: "No technical evidence submitted.", simple: "There’s no proof we did it." },
                { title: "Data Publicly Available", content: "Claimed data was already public.", simple: "That info was already on the internet." }
            ],
            verdictStrong: "Plaintiff wins if hacking can be proven.",
            verdictWeak: "Defendant wins due to lack of evidence."
        },
        property: {
            plaintiff: [
                { title: "Illegal Possession", content: "Encroachment under Transfer of Property Act.", simple: "They took over our land illegally." },
                { title: "No Ownership Documents", content: "Defendant lacks valid title deeds.", simple: "They don’t have real papers proving it’s theirs." }
            ],
            defendant: [
                { title: "Long-Term Possession", content: "Defendant occupied property peacefully for 12+ years.", simple: "We’ve lived here for years peacefully." },
                { title: "Boundary Dispute", content: "Dispute over unclear land demarcation.", simple: "The boundaries were unclear." }
            ],
            verdictStrong: "Plaintiff wins due to lack of ownership documents.",
            verdictWeak: "Defendant wins based on long-standing possession."
        },
        consumer: {
            plaintiff: [
                { title: "Defective Product", content: "Faulty product sold violates Consumer Protection Act.", simple: "They sold us a broken product." },
                { title: "No Refund", content: "Repeated requests ignored by seller.", simple: "They refused to return our money." }
            ],
            defendant: [
                { title: "Usage Damage", content: "Damage caused by improper use.", simple: "They broke it themselves." },
                { title: "Return Window Passed", content: "Claim made after valid return period.", simple: "They waited too long to complain." }
            ],
            verdictStrong: "Plaintiff wins due to seller negligence.",
            verdictWeak: "Defendant wins due to misuse or delay."
        },
        ipc: {
            plaintiff: [
                { title: "Assault", content: "Physical violence under IPC Section 351.", simple: "They hit someone, which is a crime." },
                { title: "Criminal Intimidation", content: "Threats made violating Section 503.", simple: "They scared or threatened someone illegally." }
            ],
            defendant: [
                { title: "Self Defense", content: "Action done in self-defense under Section 96.", simple: "We only acted to protect ourselves." },
                { title: "False Allegations", content: "No medical proof or witnesses.", simple: "They’re lying. No real proof exists." }
            ],
            verdictStrong: "Plaintiff wins due to clear evidence of assault.",
            verdictWeak: "Defendant wins due to lack of evidence or valid defense."
        }
    };

    generateBtn.addEventListener('click', function () {
        if (caseInput.value.trim() === '') {
            alert('Please describe your legal case first');
            return;
        }

        let caseText = caseInput.value.toLowerCase();
        caseType = 'contract';

        if (caseText.includes('job') || caseText.includes('employee') || caseText.includes('fired')) {
            caseType = 'employment';
        } else if (caseText.includes('hack') || caseText.includes('cyber') || caseText.includes('data')) {
            caseType = 'cyber';
        } else if (caseText.includes('land') || caseText.includes('property') || caseText.includes('boundary')) {
            caseType = 'property';
        } else if (caseText.includes('refund') || caseText.includes('product') || caseText.includes('warranty')) {
            caseType = 'consumer';
        } else if (caseText.includes('hit') || caseText.includes('fight') || caseText.includes('threat')) {
            caseType = 'ipc';
        }

        plaintiffArguments.innerHTML = '';
        defendantArguments.innerHTML = '';
        verdictText.innerHTML = '';

        currentArguments = legalArguments[caseType];

        currentArguments.plaintiff.forEach((arg, index) => {
            setTimeout(() => {
                const card = createArgumentCard(arg.title, arg.content);
                plaintiffArguments.appendChild(card);
                card.classList.add('fade-in');
            }, index * 200);
        });

        currentArguments.defendant.forEach((arg, index) => {
            setTimeout(() => {
                const card = createArgumentCard(arg.title, arg.content);
                defendantArguments.appendChild(card);
                card.classList.add('fade-in');
            }, index * 200 + 100);
        });

        setTimeout(() => {
            const strength = caseInput.value.length % 2 === 0 ? 'verdictStrong' : 'verdictWeak';
            verdictText.textContent = currentArguments[strength];
            verdictText.classList.add('fade-in');
            gavelSound.play();
        }, 1000);
    });

    swapBtn.addEventListener('click', function () {
        const plaintiffHTML = plaintiffArguments.innerHTML;
        const defendantHTML = defendantArguments.innerHTML;
        plaintiffArguments.innerHTML = defendantHTML;
        defendantArguments.innerHTML = plaintiffHTML;
    });

    simplifyBtn.addEventListener('click', function () {
        if (!currentArguments.plaintiff || !currentArguments.defendant) {
            alert('Please generate arguments first.');
            return;
        }

        plaintiffArguments.innerHTML = '';
        defendantArguments.innerHTML = '';

        currentArguments.plaintiff.forEach((arg, index) => {
            setTimeout(() => {
                const card = createArgumentCard(arg.title, arg.simple);
                plaintiffArguments.appendChild(card);
                card.classList.add('fade-in');
            }, index * 200);
        });

        currentArguments.defendant.forEach((arg, index) => {
            setTimeout(() => {
                const card = createArgumentCard(arg.title, arg.simple);
                defendantArguments.appendChild(card);
                card.classList.add('fade-in');
            }, index * 200 + 100);
        });

        verdictText.textContent = "These are simplified versions of both sides' arguments to help you understand easily.";
    });

    function createArgumentCard(title, content) {
        const card = document.createElement('div');
        card.className = 'argument-card pixel-shadow';

        const h3 = document.createElement('h3');
        h3.textContent = title;
        const p = document.createElement('p');
        p.textContent = content;

        card.appendChild(h3);
        card.appendChild(p);

        return card;
    }
});