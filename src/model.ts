export type Server = { id: string; name: string; address: string; os: string; group: string; location: string; owner: string; notes: string; status: 'Healthy' | 'Warning' | 'Offline' | 'Unmonitored'; cpu: number; memory: number; disk: number; uptime: number };
export const key = 'linuxops.inventory.v1';
export const sample: Server[] = [
 ['lab-web-01','192.0.2.11','Ubuntu 24.04','Web','Hyderabad lab','Platform','Healthy',24,41,38,42],
 ['lab-db-01','192.0.2.12','AlmaLinux 10','Database','Hyderabad lab','Database','Warning',68,87,61,28],
 ['lab-awx-01','192.0.2.13','Ubuntu 24.04','Automation','Hyderabad lab','Platform','Healthy',37,58,44,16],
 ['lab-monitor-01','192.0.2.14','AlmaLinux 10','Monitoring','Hyderabad lab','SRE','Healthy',18,32,29,64],
 ['lab-edge-01','192.0.2.15','Alpine Linux','Network','Remote lab','Network','Offline',0,0,0,0],
 ['lab-app-01','192.0.2.16','Rocky Linux 9','Application','Remote lab','Platform','Healthy',32,49,52,19]
].map((r,i)=>({id:`demo-${i}`,name:r[0],address:r[1],os:r[2],group:r[3],location:r[4],owner:r[5],status:r[6],cpu:r[7],memory:r[8],disk:r[9],uptime:r[10],notes:'Fictional lab server. Metrics are simulated.'} as Server));
export function validateInventory(value: unknown): value is Server[] {
 if(!Array.isArray(value)||value.length>1000)return false;
 const ids=new Set<string>();
 return value.every(s=>{if(!s||typeof s!=='object')return false;
 for(const k of ['id','name','address','os','group','location','owner','notes'])if(typeof s[k]!=='string'||s[k].length>2000)return false;
 if(!s.id||!s.name.trim()||!s.address.trim()||ids.has(s.id))return false; ids.add(s.id);
 return ['Healthy','Warning','Offline','Unmonitored'].includes(s.status)&&['cpu','memory','disk'].every(k=>typeof s[k]==='number'&&Number.isFinite(s[k])&&s[k]>=0&&s[k]<=100)&&typeof s.uptime==='number'&&Number.isFinite(s.uptime)&&s.uptime>=0;
 });
}
export function decodeBackup(raw:string):Server[]{ const value=JSON.parse(raw); const rows=Array.isArray(value)?value:value?.version===1?value.servers:null; if(!validateInventory(rows))throw new Error('Invalid backup. Expected a Version 1 inventory with unique server IDs and valid metrics.'); return rows; }
export function toCSV(rows:Server[]){const cols=['name','address','os','group','location','owner','status','cpu','memory','disk','uptime','notes'] as const; const quote=(v:unknown)=>{let s=String(v);if(/^[=+@\-\t\r\n]/.test(s))s="'"+s;return '"'+s.replaceAll('"','""')+'"';};return [cols.join(','),...rows.map(s=>cols.map(c=>quote(s[c])).join(','))].join('\r\n');}
export function getAlerts(rows:Server[]){return rows.flatMap(s=>s.status==='Offline'?[{id:s.id,server:s.name,severity:'Critical',message:'Host unavailable in sample data'}]:s.status==='Unmonitored'?[]:[...(s.cpu>=80?[{id:s.id+'cpu',server:s.name,severity:'Warning',message:`CPU utilization at ${s.cpu}%`}]:[]),...(s.memory>=80?[{id:s.id+'mem',server:s.name,severity:'Warning',message:`Memory utilization at ${s.memory}%`}]:[]),...(s.disk>=80?[{id:s.id+'disk',server:s.name,severity:'Warning',message:`Disk usage at ${s.disk}%`}]:[])]);}
