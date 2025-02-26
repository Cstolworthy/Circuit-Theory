document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to current lesson page
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.lesson-nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    // Initialize code snippets for syntax highlighting if available
    if (typeof hljs !== 'undefined') {
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightBlock(block);
        });
    }

    // Add interactive elements for demonstrations if needed
    setupInteractiveElements();
});

function setupInteractiveElements() {
    // This function will be used to set up any interactive demonstrations
    // For example, simulating logic gates or circuit behavior
    
    // Logic gate simulation elements
    const logicGateSims = document.querySelectorAll('.logic-gate-sim');
    if (logicGateSims.length > 0) {
        logicGateSims.forEach(sim => {
            initLogicGateSimulation(sim);
        });
    }

    // Binary calculator elements
    const binaryCalcs = document.querySelectorAll('.binary-calculator');
    if (binaryCalcs.length > 0) {
        binaryCalcs.forEach(calc => {
            initBinaryCalculator(calc);
        });
    }
}

function initLogicGateSimulation(container) {
    // Logic gate simulation functionality
    // This would be expanded with actual simulation code
    const inputs = container.querySelectorAll('.gate-input');
    const outputElement = container.querySelector('.gate-output');
    const gateType = container.dataset.gateType;
    
    inputs.forEach(input => {
        input.addEventListener('change', () => {
            updateGateOutput(container, gateType);
        });
    });
}

function updateGateOutput(container, gateType) {
    // Calculate output based on gate type and input states
    const inputs = Array.from(container.querySelectorAll('.gate-input'))
        .map(input => input.checked ? 1 : 0);
    const outputElement = container.querySelector('.gate-output');
    let output = 0;
    
    switch(gateType) {
        case 'and':
            output = inputs.every(val => val === 1) ? 1 : 0;
            break;
        case 'or':
            output = inputs.some(val => val === 1) ? 1 : 0;
            break;
        case 'not':
            output = inputs[0] === 0 ? 1 : 0;
            break;
        case 'nand':
            output = inputs.every(val => val === 1) ? 0 : 1;
            break;
        case 'nor':
            output = inputs.some(val => val === 1) ? 0 : 1;
            break;
        case 'xor':
            output = inputs.filter(val => val === 1).length % 2 === 1 ? 1 : 0;
            break;
        default:
            output = 0;
    }
    
    outputElement.textContent = output;
    outputElement.className = 'gate-output ' + (output === 1 ? 'high' : 'low');
}

function initBinaryCalculator(container) {
    // Binary calculator functionality
    const input1 = container.querySelector('.binary-input-1');
    const input2 = container.querySelector('.binary-input-2');
    const operation = container.querySelector('.binary-operation');
    const resultElement = container.querySelector('.binary-result');
    const calculateBtn = container.querySelector('.binary-calculate');
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', () => {
            performBinaryCalculation(input1, input2, operation, resultElement);
        });
    }
}

function performBinaryCalculation(input1, input2, operation, resultElement) {
    // Calculate result based on binary inputs and selected operation
    const val1 = parseInt(input1.value, 2);
    const val2 = parseInt(input2.value, 2);
    let result = 0;
    
    switch(operation.value) {
        case 'add':
            result = val1 + val2;
            break;
        case 'subtract':
            result = val1 - val2;
            break;
        case 'multiply':
            result = val1 * val2;
            break;
        case 'and':
            result = val1 & val2;
            break;
        case 'or':
            result = val1 | val2;
            break;
        case 'xor':
            result = val1 ^ val2;
            break;
        case 'not':
            result = ~val1;
            break;
        default:
            result = 0;
    }
    
    resultElement.textContent = result.toString(2);
}
