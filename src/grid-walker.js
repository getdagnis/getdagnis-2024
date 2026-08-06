// TODO: Consider moving to React
// This vanilla JS code was originally written by me in 2019 for the v1 of this site:
// https://getdagnis.github.io/2020/public/

const launchGridWalker = () => {
  const gridItems = document.querySelectorAll('.grid-item');
  let hoverCol = 0;
  let hoverRow = 0;
  let previousHoveredInfo = '';

  // handle case when hover walker leaves the grid-container
  const gridContainer = document.getElementById('grid-container');
  gridContainer.addEventListener('mouseleave', () => {
    gridItems.forEach((gridItem) => {
      const itemInfo = gridItem.querySelector('.thumb-info');
      const col = parseInt(gridItem.dataset.gridCol);
      const row = parseInt(gridItem.dataset.gridRow);

      itemInfo.classList = 'thumb-info display-none';

      if (col === 4) {
        itemInfo.classList = 'thumb-info thumb-info-hide-right';
      }
      if (col === 1) {
        itemInfo.classList = 'thumb-info thumb-info-hide-left';
      }
      if (row === 1) {
        itemInfo.classList = 'thumb-info thumb-info-hide-top';
      }
      if (itemInfo !== previousHoveredInfo) {
        itemInfo.classList = 'thumb-info display-none transition-none';
      }
    });
  });

  // define currently hovered item and "infect" items directly around it
  for (const item of gridItems) {
    item.addEventListener('mouseenter', (e) => {
      const hovered = e.target;
      hoverCol = parseInt(hovered.dataset.gridCol);
      hoverRow = parseInt(hovered.dataset.gridRow);
      const hoveredItemInfo = e.target.querySelector('.thumb-info');

      gridItems.forEach((gridItem) => {
        const itemRow = parseInt(gridItem.dataset.gridRow);
        const itemCol = parseInt(gridItem.dataset.gridCol);
        const itemInfo = gridItem.querySelector('.thumb-info');

        if (!gridItem || !itemInfo) {
          return;
        }

        // hide .thumb-info child for all items except hovered and previous hovered
        if (itemInfo !== hoveredItemInfo && itemInfo !== previousHoveredInfo) {
          // let them finish transition first before hiding them
          itemInfo.classList = 'thumb-info display-none transition-none';
        } else if (itemInfo === previousHoveredInfo) {
          itemInfo.classList = 'thumb-info slow-transition';
        } else {
          itemInfo.classList = 'thumb-info fast-transition';
          setTimeout(() => {
            itemInfo.classList.remove('fast-transition');
          }, 100);
        }

        // move .thumb-info for surrounding items to where it needs to slide-in from
        if (itemRow + 1 === hoverRow && Math.abs(itemCol - hoverCol <= 1)) {
          itemInfo.classList.add('thumb-info-hide-bottom');
          setTimeout(() => {
            itemInfo.classList.remove('transition-none');
          }, 100);
          itemInfo.classList.remove('display-none');
        }
        if (itemRow + 1 === hoverRow && itemCol + hoverCol === 1) {
          itemInfo.classList.add('thumb-info-hide-bottom');
          setTimeout(() => {
            itemInfo.classList.remove('transition-none');
          }, 100);
          itemInfo.classList.remove('display-none');
        }
        if (itemRow - 1 === hoverRow && Math.abs(hoverCol - itemCol <= 1)) {
          itemInfo.classList.add('thumb-info-hide-top');
          setTimeout(() => {
            itemInfo.classList.remove('transition-none');
          }, 100);
          itemInfo.classList.remove('display-none');
        }
        if (itemRow === hoverRow && itemCol - hoverCol === 1) {
          itemInfo.classList.add('thumb-info-hide-left');
          setTimeout(() => {
            itemInfo.classList.remove('transition-none');
          }, 100);
          itemInfo.classList.remove('display-none');
        }
        if (itemRow === hoverRow && itemCol - hoverCol === -1) {
          itemInfo.classList.add('thumb-info-hide-right');
          setTimeout(() => {
            itemInfo.classList.remove('transition-none');
          }, 100);
          itemInfo.classList.remove('display-none');
        }
      });

      previousHoveredInfo = hovered.querySelector('.thumb-info');
    });
  }
};

function handleDOMChanges(mutationsList) {
  mutationsList.forEach((mutation) => {
    // Check if #grid-container is added or removed
    if (mutation.type === 'childList') {
      const gridContainer = document.getElementById('grid-container');
      if (gridContainer) {
        // #grid-container is added
        launchGridWalker();
      } else {
        // .grid-container is removed, remove event listener or perform cleanup
        document.removeEventListener('mouseenter', launchGridWalker);
      }
    }
  });
}

// Create a MutationObserver instance
const observer = new MutationObserver(handleDOMChanges);

// Start observing changes in the DOM
observer.observe(document.body, { subtree: true, childList: true });
