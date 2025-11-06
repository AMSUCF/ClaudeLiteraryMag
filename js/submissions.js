/**
 * Claude Literary Magazine - Submissions Form JavaScript
 * Handles form validation, character counting, and submission
 */

(function() {
    'use strict';

    /**
     * Character/Word Counter
     */
    function initCharacterCounters() {
        // Cover Letter Counter
        const coverLetter = document.getElementById('cover-letter');
        const coverLetterCount = document.getElementById('cover-letter-count');

        if (coverLetter && coverLetterCount) {
            coverLetter.addEventListener('input', function() {
                const count = this.value.length;
                coverLetterCount.textContent = count;

                // Warn if approaching limit
                if (count > 900) {
                    coverLetterCount.style.color = 'var(--color-halloween-orange)';
                } else {
                    coverLetterCount.style.color = '';
                }
            });
        }

        // Submission Text Counter (characters and words)
        const submissionText = document.getElementById('submission-text');
        const submissionCount = document.getElementById('submission-count');
        const submissionWords = document.getElementById('submission-words');

        if (submissionText && submissionCount && submissionWords) {
            submissionText.addEventListener('input', function() {
                const text = this.value;
                const charCount = text.length;
                const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length;

                submissionCount.textContent = charCount.toLocaleString();
                submissionWords.textContent = wordCount.toLocaleString();
            });
        }

        // Author Bio Counter
        const authorBio = document.getElementById('author-bio');
        const bioCount = document.getElementById('bio-count');

        if (authorBio && bioCount) {
            authorBio.addEventListener('input', function() {
                const count = this.value.length;
                bioCount.textContent = count;

                // Warn if approaching limit
                if (count > 550) {
                    bioCount.style.color = 'var(--color-halloween-orange)';
                } else {
                    bioCount.style.color = '';
                }
            });
        }
    }

    /**
     * Form Validation
     */
    function validateForm(form) {
        const errors = [];

        // Author Name
        const authorName = form.querySelector('#author-name');
        if (authorName && authorName.value.trim().length < 2) {
            errors.push('Please enter your full name.');
        }

        // Email
        const email = form.querySelector('#author-email');
        if (email) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email.value.trim())) {
                errors.push('Please enter a valid email address.');
            }
        }

        // Work Title
        const workTitle = form.querySelector('#work-title');
        if (workTitle && workTitle.value.trim().length < 1) {
            errors.push('Please enter the title of your work.');
        }

        // Category
        const category = form.querySelector('#category');
        if (category && !category.value) {
            errors.push('Please select a category.');
        }

        // Word Count
        const wordCount = form.querySelector('#word-count');
        if (wordCount) {
            const count = parseInt(wordCount.value);
            const selectedCategory = category ? category.value : '';

            if (isNaN(count) || count < 1) {
                errors.push('Please enter a valid word count.');
            } else if (selectedCategory === 'fiction' && count > 7000) {
                errors.push('Fiction submissions must be 7,000 words or less.');
            } else if (selectedCategory === 'creative-nonfiction' && count > 5000) {
                errors.push('Creative nonfiction submissions must be 5,000 words or less.');
            }
        }

        // Submission Text
        const submissionText = form.querySelector('#submission-text');
        if (submissionText && submissionText.value.trim().length < 50) {
            errors.push('Your submission text seems too short. Please paste your complete work.');
        }

        // Author Bio
        const authorBio = form.querySelector('#author-bio');
        if (authorBio && authorBio.value.trim().length < 20) {
            errors.push('Please provide an author bio (at least 20 characters).');
        }

        // Human Authored Checkbox
        const humanAuthored = form.querySelector('#human-authored');
        if (humanAuthored && !humanAuthored.checked) {
            errors.push('You must attest that your work is human-authored to submit.');
        }

        return errors;
    }

    /**
     * Display Form Messages
     */
    function showMessage(message, type = 'error') {
        const messageDiv = document.getElementById('form-message');
        if (messageDiv) {
            messageDiv.textContent = message;
            messageDiv.className = 'form-message ' + type;
            messageDiv.style.display = 'block';

            // Scroll to message
            messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            // Auto-hide success messages after 5 seconds
            if (type === 'success') {
                setTimeout(() => {
                    messageDiv.style.display = 'none';
                }, 5000);
            }
        }
    }

    /**
     * Handle Form Submission
     */
    function initFormSubmission() {
        const form = document.getElementById('submission-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            // Clear previous messages
            const messageDiv = document.getElementById('form-message');
            if (messageDiv) {
                messageDiv.style.display = 'none';
            }

            // Validate form
            const errors = validateForm(form);

            if (errors.length > 0) {
                e.preventDefault();
                const errorMessage = errors.join(' ');
                showMessage(errorMessage, 'error');
                return false;
            }

            // If validation passes, show loading state
            const submitButton = document.getElementById('submit-button');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Submitting...';
            }

            // Form will submit naturally to FormSubmit
            // Note: In a production environment, you might want to handle this with AJAX
            // and provide better feedback, but for now we'll let the form submit normally
        });
    }

    /**
     * Category Change Handler
     */
    function initCategoryHelper() {
        const category = document.getElementById('category');
        const wordCount = document.getElementById('word-count');

        if (category && wordCount) {
            category.addEventListener('change', function() {
                const selected = this.value;
                let maxWords = 0;
                let placeholder = '2500';

                switch(selected) {
                    case 'fiction':
                        maxWords = 7000;
                        placeholder = 'Maximum 7,000 words';
                        break;
                    case 'creative-nonfiction':
                        maxWords = 5000;
                        placeholder = 'Maximum 5,000 words';
                        break;
                    case 'poetry':
                        maxWords = 500;
                        placeholder = 'Approximate word count';
                        break;
                }

                if (maxWords > 0) {
                    wordCount.setAttribute('max', maxWords);
                    wordCount.setAttribute('placeholder', placeholder);
                }
            });
        }
    }

    /**
     * Auto-save to localStorage (optional feature)
     */
    function initAutoSave() {
        const form = document.getElementById('submission-form');
        if (!form) return;

        const STORAGE_KEY = 'claude-lit-mag-draft';

        // Load saved draft
        try {
            const savedData = localStorage.getItem(STORAGE_KEY);
            if (savedData) {
                const data = JSON.parse(savedData);
                const shouldRestore = confirm('We found a saved draft. Would you like to restore it?');

                if (shouldRestore) {
                    Object.keys(data).forEach(key => {
                        const field = form.querySelector(`[name="${key}"]`);
                        if (field) {
                            if (field.type === 'checkbox') {
                                field.checked = data[key];
                            } else {
                                field.value = data[key];
                            }
                            // Trigger input event to update character counters
                            field.dispatchEvent(new Event('input'));
                        }
                    });
                } else {
                    localStorage.removeItem(STORAGE_KEY);
                }
            }
        } catch (e) {
            console.warn('Could not restore draft:', e);
        }

        // Save draft on input (debounced)
        let saveTimeout;
        form.addEventListener('input', function(e) {
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(() => {
                try {
                    const formData = new FormData(form);
                    const data = {};
                    formData.forEach((value, key) => {
                        data[key] = value;
                    });
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
                } catch (e) {
                    console.warn('Could not save draft:', e);
                }
            }, 1000);
        });

        // Clear draft on successful submission
        form.addEventListener('submit', function() {
            try {
                localStorage.removeItem(STORAGE_KEY);
            } catch (e) {
                console.warn('Could not clear draft:', e);
            }
        });
    }

    /**
     * Add Helpful Tooltips
     */
    function initTooltips() {
        // Add title attributes for additional guidance
        const wordCountField = document.getElementById('word-count');
        if (wordCountField) {
            wordCountField.setAttribute('title', 'Enter the approximate word count of your submission');
        }

        const simultaneousCheckbox = document.getElementById('simultaneous');
        if (simultaneousCheckbox) {
            simultaneousCheckbox.setAttribute('title', 'Check this if you are submitting this work to other publications simultaneously');
        }
    }

    /**
     * Initialize All Functions
     */
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        // Only initialize if we're on the submissions page
        const form = document.getElementById('submission-form');
        if (!form) return;

        initCharacterCounters();
        initFormSubmission();
        initCategoryHelper();
        initAutoSave();
        initTooltips();

        console.log('Submissions form initialized successfully');
    }

    // Start initialization
    init();

})();
