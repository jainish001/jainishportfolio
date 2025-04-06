// Dashboard Charts using Chart.js
// Wait for both DOM and Chart.js to be loaded
function initializeDashboard() {
    // Add a small delay to ensure Chart.js is fully loaded
    setTimeout(() => {
        // Ensure Chart.js is loaded
        if (typeof Chart === 'undefined') {
            console.error('Chart.js not loaded');
            return;
        }

        // Set Chart.js default options for all charts
        Chart.defaults.color = '#FFFFFF';
        Chart.defaults.responsive = true;
        Chart.defaults.maintainAspectRatio = false;
        
        // Skills Distribution Chart
        const skillsCtx = document.getElementById('skillsChart');
        if (skillsCtx) {
            new Chart(skillsCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Frontend', 'Backend', 'AI/ML', 'Cloud'],
                    datasets: [{
                        data: [35, 25, 20, 20],
                        backgroundColor: [
                            '#6C63FF',
                            '#FF6B6B',
                            '#4ECDC4',
                            '#00F0FF'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                color: '#FFFFFF',
                                padding: 20,
                                font: {
                                    size: 14
                                }
                            }
                        }
                    }
                }
            });
        }

        // Project Progress Chart
        const progressCtx = document.getElementById('progressChart');
        if (progressCtx) {
            new Chart(progressCtx, {
                type: 'bar',
                data: {
                    labels: ['AI Analytics', 'Mobile App', 'Cloud System'],
                    datasets: [{
                        label: 'Progress (%)',
                        data: [85, 70, 90],
                        backgroundColor: '#6C63FF'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            ticks: {
                                color: '#FFFFFF',
                                font: {
                                    size: 12
                                }
                            }
                        },
                        x: {
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            ticks: {
                                color: '#FFFFFF',
                                font: {
                                    size: 12
                                }
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            labels: {
                                color: '#FFFFFF',
                                font: {
                                    size: 14
                                }
                            }
                        }
                    }
                }
            });
        }
    }, 1000); // Increased delay to 1 second to ensure DOM is ready
}

// Update metrics in real-time
function updateMetrics() {
    const metrics = {
        projects: Math.floor(Math.random() * 3) + 8,
        commits: Math.floor(Math.random() * 50) + 150,
        hours: Math.floor(Math.random() * 20) + 80,
        efficiency: Math.floor(Math.random() * 10) + 90
    };

    const elements = {
        totalProjects: document.getElementById('totalProjects'),
        totalCommits: document.getElementById('totalCommits'),
        hoursWorked: document.getElementById('hoursWorked'),
        efficiency: document.getElementById('efficiency')
    };

    // Update each metric if the element exists
    if (elements.totalProjects) elements.totalProjects.textContent = metrics.projects;
    if (elements.totalCommits) elements.totalCommits.textContent = metrics.commits;
    if (elements.hoursWorked) elements.hoursWorked.textContent = metrics.hours;
    if (elements.efficiency) elements.efficiency.textContent = metrics.efficiency + '%';
}

// Initialize dashboard when the section is visible
document.addEventListener('DOMContentLoaded', function() {
    const dashboardSection = document.getElementById('dashboard');
    if (dashboardSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    initializeDashboard();
                    updateMetrics();
                    // Update metrics every 5 seconds
                    setInterval(updateMetrics, 5000);
                }
            });
        }, {
            threshold: 0.1 // Trigger when at least 10% of the section is visible
        });
        observer.observe(dashboardSection);
    }
});
