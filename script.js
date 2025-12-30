dscc.subscribeToData(draw, { transform: dscc.objectTransform });

function draw(data) {
  const dimensionId = data.fields.dimension[0].id;
  const rows = data.tables.DEFAULT;

  const dropdown = document.getElementById('dropdownContent');
  const button = document.getElementById('dropdownBtn');
  const tooltip = document.getElementById('tooltipText');

  dropdown.innerHTML = '';

  // 3 унікальні значення
  const values = [...new Set(rows.map(r => r[dimensionId]))].slice(0, 3);

  if (!values.length) return;

  // ===== DEFAULT VALUE =====
  const defaultValue = values[0];
  applyFilter(defaultValue);

  values.forEach(value => {
    const item = document.createElement('div');
    item.textContent = value;

    item.onclick = () => applyFilter(value);

    dropdown.appendChild(item);
  });

  function applyFilter(value) {
    button.innerText = value;
    tooltip.innerText = `Обрано: ${value}`;

    dscc.sendInteraction({
      type: 'FILTER',
      data: {
        concepts: [dimensionId],
        values: [[value]]
      }
    });
  }
}

