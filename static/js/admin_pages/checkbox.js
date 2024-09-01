    const nameboxes = document.querySelectorAll('.namebox');

    nameboxes.forEach((box, index) => {
        const checkbox = box.querySelector('input[type="checkbox"]');
        const label = box.querySelector('label');
        
        // 고유한 ID 생성
        const uniqueId = `checkbox${index + 1}`;
        
        // ID를 checkbox와 label의 for 속성에 할당
        checkbox.id = uniqueId;
        label.setAttribute('for', uniqueId);
    });

    
     