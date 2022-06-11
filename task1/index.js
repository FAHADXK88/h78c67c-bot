import axios from 'axios';
import { enMonthsToHani, matchWorldwide } from './util.js';
import { init } from '../common/bot.js';

async function getSource(title) {
    return await axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
            action: 'query',
            prop: 'revisions',
            titles: title,
            rvslots: '*',
            rvprop: 'content',
            format: 'json',
            formatversion: 2,
        },
    });
}

(async function() {
    const bot = await init({});
    await worldwide(bot);
})();

async function worldwide(bot){
    const res = await getSource('Template:Cases in the COVID-19 pandemic');
    
    const content = res.data.query.pages[0].revisions[0].slots.main.content;
    let paramVals = [];
    try {
        matchWorldwide.forEach(regex => paramVals.push(content.match(regex)[1]));
    } catch(e) {
        return console.error('Error: Malformed template source (worldwide).');
    }
    const output = 
`{{武漢肺炎病例總數/core
 |confirmed   = ${paramVals[0]}
 |deaths      = ${paramVals[1]}
 |date        = ${paramVals[5]}年${enMonthsToHani(paramVals[4])}月${paramVals[3]}號
 |time        = ${paramVals[2]} UTC
 |type        = {{{1}}}
}}<!-- *** For consistency, simplicity and credibility, we kindly ask to source ONLY from Johns Hopkins University.
 *** Please refer to the Talk Page for more information.
-->{{#ifeq:{{{editlink}}}|yes|{{Edit sup|Template:武漢肺炎病例總數}}|}}{{#ifeq:{{{ref}}}|no||<!-- Reference: --><ref name="JHU_ticker">{{cite web |url=https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6 |title=COVID-19 Dashboard by the Center for Systems Science and Engineering (CSSE) at Johns Hopkins University (JHU) |publisher=[[莊鶴堅斯大學]] |website=[[ArcGIS]] |access-date=${paramVals[5]}年${enMonthsToHani(paramVals[4])}月${paramVals[3]}號}}</ref>}}<noinclude>
{{documentation}}
[[Category:武漢肺炎疫情模]]
</noinclude>
`;
    await bot.save('Template:武漢肺炎病例總數', output, '[[User:H78c67c-bot|工作1]]：更新武漢肺炎數據').catch(e => console.error(`Error saving page: ${e}`));
    console.log('Task 1 worldwide end');
}
