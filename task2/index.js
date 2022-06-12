import axios from 'axios';
import { init } from '../common/bot.js';
import locations from './locations.json';

const strcmp = (a, b) => (a < b ? -1 : (a > b ? 1 : 0));

const locationsMapping = Object.fromEntries(locations.map(l => [l.valueA3, { a2: l.valueA2, name: l.itemLabel }]));

const columns = {
    cases: 'total_cases',
    deaths: 'total_deaths',
    deaths_per_million: 'total_deaths_per_million',
    fully_vaccinated: 'people_fully_vaccinated',
    percent_fully_vaccinated: 'people_fully_vaccinated_per_hundred',
    percent_vaccinated: 'people_vaccinated_per_hundred',
    total_vaccinated: 'people_vaccinated',
    vaccine_doses: 'total_vaccinations',
    population: 'population'
};

async function fetchOWIDData() {
    const data = (await axios.get('https://covid.ourworldindata.org/data/latest/owid-covid-latest.json')).data;
    const output = {};
    for (const [k, v] of Object.entries(data)
                            .filter(([code]) => !!locationsMapping[code])
                            .sort(([a], [b]) => strcmp(locationsMapping[a].a2, locationsMapping[b].a2))
    ) {
        if (!locationsMapping[k]) continue;
        output[locationsMapping[k].a2] = {
            name: locationsMapping[k].name
        };
        for (const [wikiColumn, owidColumn] of Object.entries(columns)) {
            if (!columns[wikiColumn]) continue;
            output[locationsMapping[k].a2][wikiColumn] = v[owidColumn];
        }
    }
    return JSON.stringify(output, null, 4);
}

(async function() {
    const bot = await init({});
    const data = await fetchOWIDData();
    await bot.save('Template:武漢肺炎數據/data', data, '[[User:H78c67c-bot/tasks/1|工作1]]：更新武漢肺炎數據').catch(e => console.error(`Error saving page: ${e}`));
    console.log('Task 2 data end');
})();
