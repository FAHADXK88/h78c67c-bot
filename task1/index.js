import axios from 'axios';
import { init } from '../common/bot.js';

async function fetchJHUData() {
    const res = await axios.get('https://jhucoronavirus.azureedge.net/jhucoronavirus/homepage-featured-stats.json');
    if (res.status !== 200) throw new Error('Error fetching data from JHU: ' + res.statusText);
    return res.data;
}

function genText(data) {
    const date = new Date(data.updated);
    const formattedDate = `${date.getUTCFullYear()}年${date.getUTCMonth() + 1}月${date.getUTCDate()}號`;
    const output = 
`{{武漢肺炎病例總數/core
 |confirmed   = ${data.cases.global}
 |deaths      = ${data.deaths.global}
 |date        = ${formattedDate}
 |time        = ${date.getUTCHours().toString().padStart(2, '0')}:${date.getUTCMinutes()} UTC
 |type        = {{{1}}}
}}<!-- *** For consistency, simplicity and credibility, we kindly ask to source ONLY from Johns Hopkins University.
 *** Please refer to the Talk Page for more information.
-->{{#ifeq:{{{editlink}}}|yes|{{Edit sup|Template:武漢肺炎病例總數}}|}}{{#ifeq:{{{ref}}}|no||<!-- Reference: --><ref name="JHU_ticker">{{cite web |url=https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6 |title=COVID-19 Dashboard by the Center for Systems Science and Engineering (CSSE) at Johns Hopkins University (JHU) |publisher=[[莊鶴堅斯大學]] |website=[[ArcGIS]] |access-date=${formattedDate}}}</ref>}}<noinclude>
{{documentation}}
[[Category:武漢肺炎疫情模]]
</noinclude>
`;
    return output;
}

async function worldwide(bot){
    const data = await fetchJHUData();
    const output = genText(data);
    await bot.save('Template:武漢肺炎病例總數', output, '[[User:H78c67c-bot/tasks/1|工作1]]：更新武漢肺炎數據').catch(e => console.error(`Error saving page: ${e}`));
    console.log('Task 1 worldwide end');
}

(async function() {
    const bot = await init({});
    await worldwide(bot);
})();
