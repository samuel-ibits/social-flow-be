function getNextRunAt(currentDate, recurrence) {
    const next = new Date(currentDate);
  
    switch (recurrence) {
      case 'daily':
        next.setDate(next.getDate() + 1);
        break;
      case 'weekly':
        next.setDate(next.getDate() + 7);
        break;
      case 'monthly':
        next.setMonth(next.getMonth() + 1);
        break;
      default:
        return null;
    }
  
    return next;
  }
  
  module.exports = getNextRunAt;
  