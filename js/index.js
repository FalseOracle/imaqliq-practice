function showConfirmModal() {
    document.getElementById('confirmModal').style.display = 'flex';
}

function closeConfirmModal() {
    document.getElementById('confirmModal').style.display = 'none';
}

function confirmAction() {
    closeConfirmModal();
    // Выполняем запрос к php/turnon.php
    fetch('php/turnon.php')
        .then(response => {
            if (response.ok) {
                document.getElementById('successModal').style.display = 'flex';
            } else {
                alert('Произошла ошибка при включении виртуальной машины.');
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при включении виртуальной машины.');
        });
}

function closeSuccessModal() {
    document.getElementById('successModal').style.display = 'none';
}

function toggleSidebar() {
    var sidebar = document.getElementById("mySidebar");
    sidebar.classList.toggle('open');
}

document.addEventListener('click', function(event) {
    var isClickInside = document.getElementById('mySidebar').contains(event.target) || document.querySelector('.burger-menu').contains(event.target);
    if (!isClickInside) {
        document.getElementById('mySidebar').classList.remove('open');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const savedBgColor = localStorage.getItem('vmBgColor');
    const savedTextColor = localStorage.getItem('vmTextColor');
    const savedButtonColor = localStorage.getItem('vmButtonColor');

    if (savedBgColor) {
        document.body.style.backgroundColor = savedBgColor;
    }
    if (savedTextColor) {
        document.body.style.color = savedTextColor;
    }
    if (savedButtonColor) {
        document.querySelectorAll('.button').forEach(button => {
            button.style.backgroundColor = savedButtonColor;
        });
    }
});

// Основной скрипт
document.addEventListener('DOMContentLoaded', function() {
    const savedBgColor = localStorage.getItem('vmBgColor');
    const savedTextColor = localStorage.getItem('vmTextColor');
    const savedButtonColor = localStorage.getItem('vmButtonColor');

    if (savedBgColor) {
        document.body.style.backgroundColor = savedBgColor;
    }
    if (savedTextColor) {
        document.body.style.color = savedTextColor;
    }
    if (savedButtonColor) {
        document.querySelectorAll('.button').forEach(button => {
            button.style.backgroundColor = savedButtonColor;
        });
    }
});

function showConfirmModal() {
    document.getElementById('confirmModal').style.display = 'flex';
}

function closeConfirmModal() {
    document.getElementById('confirmModal').style.display = 'none';
}

function confirmAction() {
    closeConfirmModal();
    fetch('php/turnon.php')
        .then(response => {
            if (response.ok) {
                showSuccessModal();
            } else {
                alert('Произошла ошибка при включении виртуальной машины.');
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при включении виртуальной машины.');
        });
}

function showSuccessModal() {
    document.getElementById('successModal').style.display = 'flex';
}

function closeSuccessModal() {
    document.getElementById('successModal').style.display = 'none';
}

function toggleSidebar() {
    var sidebar = document.getElementById("mySidebar");
    sidebar.classList.toggle('open');
}

document.addEventListener('click', function(event) {
    var isClickInside = document.getElementById('mySidebar').contains(event.target) || document.querySelector('.burger-menu').contains(event.target);
    if (!isClickInside) {
        document.getElementById('mySidebar').classList.remove('open');
    }
});