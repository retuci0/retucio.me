const STATUS = document.getElementById("status");
const ERROR  = document.getElementById("error");
const REPOS  = document.getElementById("repos");

const PINNED = ["sbbu", "sputnik", "spotify-overlay", "retchat"];

async function load() {
    try {
        const res = await fetch("https://api.github.com/users/retuci0/repos?per_page=100&sort=updated");
        if (!res.ok) throw new Error(`github api: ${res.status}`);
        const data = await res.json();

        STATUS.textContent = `${data.length} proyectos.`;

        const pinned = data.filter(r => PINNED.includes(r.name));
        const rest   = data.filter(r => !PINNED.includes(r.name));
        const sorted = [...pinned, ...rest];

        let html = "";

        if (pinned.length) {
        html += `<div class="pinned-label">// destacados</div>`;
        pinned.forEach(r => { html += repoCard(r); });
        html += `<br><div class="pinned-label">// todos</div>`;
        rest.forEach(r => { html += repoCard(r); });
        } else {
        sorted.forEach(r => { html += repoCard(r); });
        }

        REPOS.innerHTML = html;
    } catch (e) {
        STATUS.textContent = "";
        ERROR.textContent  = "error: " + e.message;
    }
}

function repoCard(r) {
const desc  = r.description ? `<div class="repo-desc">${esc(r.description)}</div>` : '';
const lang  = r.language    ? `<span class="lang">${esc(r.language)}</span>` : '';
const stars = r.stargazers_count ? `<span class="stars">★ ${r.stargazers_count}</span>` : '';
const forks = r.forks_count ? `<span class="forks">⑂ ${r.forks_count}</span>` : '';
const updated = `<span>actualizado el ${r.updated_at.slice(0,10)}</span>`;
const fork  = r.fork ? `<span style="color:#444">[fork]</span>` : '';

return `
    <div class="repo">
    <div class="repo-name"><a href="${r.html_url}" target="_blank">${esc(r.name)}</a> ${fork}</div>
    ${desc}
    <div class="repo-meta">${lang}${stars}${forks}${updated}</div>
    </div>`;
}

function esc(s) {
return String(s)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;');
}

load();