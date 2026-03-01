const https = require('https');
const fs = require('fs');

https.get('https://restcountries.com/v3.1/all?fields=name,region', (res) => {
  let data = '';
  res.on('data', (d) => { data += d; });
  res.on('end', () => {
    const countries = JSON.parse(data);
    const regions = {};
    countries.forEach(c => {
      const region = c.region || 'Other';
      if (!regions[region]) regions[region] = [];
      // Matching countries with what's likely in the UN dataset
      // The UN dataset uses specific names. For simplicity we use common names.
      regions[region].push(c.name.common);
    });
    
    let output = 'export const GROUPS: Record<string, string[]> = {\n';
    for (const [region, names] of Object.entries(regions)) {
      if (region === 'Other' || region === '') continue;
      output += '  "' + region + '": [\n';
      names.sort().forEach(n => {
        output += '    "' + n + '",\n';
      });
      output += '  ],\n';
    }
    output += '} as const;\n\nexport type GroupKey = keyof typeof GROUPS;\n';
    
    fs.writeFileSync('backend/src/constants/groups.ts', output);
    console.log('Successfully wrote to backend/src/constants/groups.ts');
  });
}).on('error', (e) => {
  console.error(e);
});
