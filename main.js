document.addEventListener('DOMContentLoaded', function() {
    const mainMenuPanel = document.querySelector('#main-menu-panel');
    const openSubmenuBtns = document.querySelectorAll('.open-submenu-btn');
    const backButtons = document.querySelectorAll('.back-to-main-btn');
  
    // Añadimos un evento a cada botón que abre un submenú
    openSubmenuBtns.forEach(button => {
      button.addEventListener('click', function(event) {
        event.preventDefault();
        
        // Obtenemos el panel al que queremos ir desde el atributo data-target
        const targetPanelId = this.getAttribute('data-target');
        const targetPanel = document.querySelector(targetPanelId);
        
        if (targetPanel) {
          // El menú principal se va hacia la izquierda
          mainMenuPanel.classList.add('is-leaving');
          // El submenú objetivo entra desde la derecha
          targetPanel.classList.add('is-active');
        }
      });
    });
  
    // Añadimos un evento a todos los botones de "Volver"
    backButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Encontramos el panel actual en el que está el botón "volver"
        const currentPanel = this.closest('.menu-panel');
        
        // El menú principal vuelve a su sitio
        mainMenuPanel.classList.remove('is-leaving');
        // El submenú actual se va hacia la derecha
        currentPanel.classList.remove('is-active');
      });
    });
  });