export function formatFileSize(sizeInBytes: number) {
    const units = ["bytes", "KB", "MB", "GB", "TB"];
    let fileSize = sizeInBytes;
    let unitIndex = 0;
  
    while (fileSize >= 1000 && unitIndex < units.length - 1) {
      fileSize /= 1000;
      unitIndex++;
    }
    // Round
    const displayValue = Math.round(fileSize*10)/10;
  
    return `${displayValue} ${units[unitIndex]}`;
  }