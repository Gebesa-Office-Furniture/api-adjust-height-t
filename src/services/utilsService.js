class UtilsService {

    static convertToSeconds(expiration) {
        
        const match = expiration.match(/^(\d+)([smhd])$/); // Format like '1h', '30m'
        if (!match) throw new Error('Invalid expiration format');
    
        const value = parseInt(match[1], 10);
        const unit = match[2];
        
        switch (unit) {
          case 's': return value;           // Seconds
          case 'm': return value * 60;     // Minutes
          case 'h': return value * 60 * 60;// Hours
          case 'd': return value * 60 * 60 * 24; // Days
          default: throw new Error('Invalid expiration unit');
        }
        
    }
    static filterJSON(inputJSON, allowedKeys) {
      return Object.keys(inputJSON)
        .filter(key => allowedKeys.includes(key))
        .reduce((obj, key) => {
          obj[key] = inputJSON[key];
          return obj;
        }, {});
    }

}
module.exports = UtilsService;
