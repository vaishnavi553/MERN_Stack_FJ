function trapWater(heights) {
    const n = heights.length;
    if (n === 0) return 0;
  
    let left = 0, right = n - 1;
    let leftMax = 0, rightMax = 0;
    let water = 0;
  
    while (left < right) {
      if (heights[left] < heights[right]) {
        heights[left] >= leftMax ? (leftMax = heights[left]) : water += (leftMax - heights[left]);
        left++;
      } else {
        heights[right] >= rightMax ? (rightMax = heights[right]) : water += (rightMax - heights[right]);
        right--;
      }
    }
    return water;
  }
  
  function generate() {
    const input = document.getElementById('inputHeights').value;
    const heightArray = input.split(',').map(Number);
    const svg = document.getElementById('waterTank');
    svg.innerHTML = '';
  
    const width = 30;
    const spacing = 5;
    const maxH = Math.max(...heightArray);
    const scale = 20;
  
    const n = heightArray.length;
    let leftMax = new Array(n).fill(0);
    let rightMax = new Array(n).fill(0);
    leftMax[0] = heightArray[0];
    for (let i = 1; i < n; i++) {
      leftMax[i] = Math.max(leftMax[i - 1], heightArray[i]);
    }
    rightMax[n - 1] = heightArray[n - 1];
    for (let i = n - 2; i >= 0; i--) {
      rightMax[i] = Math.max(rightMax[i + 1], heightArray[i]);
    }
  
    let waterTrapped = 0;
    for (let i = 0; i < n; i++) {
      const waterLevel = Math.min(leftMax[i], rightMax[i]);
      const waterHeight = waterLevel - heightArray[i];
      if (waterHeight > 0) {
        waterTrapped += waterHeight;
  
        svg.innerHTML += `
          <rect x="${i * (width + spacing)}" y="${(maxH - waterLevel + heightArray[i]) * scale}" 
                width="${width}" height="${waterHeight * scale}" fill="skyblue"/>
        `;
      }
  
      // Draw block
      svg.innerHTML += `
        <rect x="${i * (width + spacing)}" y="${(maxH - heightArray[i]) * scale}" 
              width="${width}" height="${heightArray[i] * scale}" fill="gray"/>
      `;
    }
  
    document.getElementById('waterOutput').textContent = `Water Trapped: ${waterTrapped} units`;
  }
  