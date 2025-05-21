
import { Monitor } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, Legend } from 'recharts';

const SkillsMonitor = () => {
  // Frontend skills data for the bar chart
  const frontendSkills = [
    { name: 'HTML/CSS', proficiency: 95 },
    { name: 'JavaScript', proficiency: 92 },
    { name: 'React', proficiency: 90 },
    { name: 'Angular', proficiency: 85 },
    { name: 'TypeScript', proficiency: 80 },
    { name: 'Redux', proficiency: 75 }
  ];

  // Backend skills data for the bar chart
  const backendSkills = [
    { name: 'Node.js', proficiency: 88 },
    { name: 'Express', proficiency: 85 },
    { name: 'MongoDB', proficiency: 82 },
    { name: 'SQL', proficiency: 75 },
    { name: 'Firebase', proficiency: 80 },
    { name: 'REST API', proficiency: 90 }
  ];

  // Other skills data for the radial chart
  const otherSkills = [
    { name: 'Git', value: 90, fill: '#8884d8' },
    { name: 'DevOps', value: 70, fill: '#83a6ed' },
    { name: 'Testing', value: 75, fill: '#8dd1e1' },
    { name: 'UI/UX', value: 80, fill: '#82ca9d' },
    { name: 'Python', value: 65, fill: '#a4de6c' },
    { name: 'Chrome Ext', value: 85, fill: '#d0ed57' }
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded p-2 text-xs">
          <p className="font-medium">{`${payload[0].name} : ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-full overflow-auto">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6 flex items-center">
          <Monitor className="w-8 h-8 mr-3 text-os-accent" />
          <h1 className="text-2xl font-bold">Skills Monitor</h1>
        </div>
        
        <p className="mb-8 text-muted-foreground">
          Visual representation of my technical skills and proficiency levels
          across various technologies and tools.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="border border-border rounded-lg p-5 bg-card">
            <h2 className="text-xl font-semibold mb-4">Frontend</h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={frontendSkills}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" width={80} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="proficiency" fill="#8884d8" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="border border-border rounded-lg p-5 bg-card">
            <h2 className="text-xl font-semibold mb-4">Backend</h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={backendSkills}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" width={80} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="proficiency" fill="#82ca9d" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="border border-border rounded-lg p-5 mb-8 bg-card">
          <h2 className="text-xl font-semibold mb-4">Other Skills</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart 
                cx="50%" 
                cy="50%" 
                innerRadius="20%" 
                outerRadius="80%" 
                barSize={10} 
                data={otherSkills}
              >
                <RadialBar
                  // Fixed: removed minAngle property and used correct props
                  background
                  dataKey="value"
                  cornerRadius={10}
                />
                <Legend 
                  iconSize={10} 
                  layout="horizontal" 
                  verticalAlign="bottom"
                  wrapperStyle={{ fontSize: '12px' }}
                />
                <Tooltip content={<CustomTooltip />} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-border rounded-lg p-5 bg-card">
            <h2 className="text-lg font-semibold mb-3">Skill Categories</h2>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span>Frontend Development</span>
                <span className="font-medium text-os-accent">90%</span>
              </li>
              <li className="flex justify-between">
                <span>Backend Development</span>
                <span className="font-medium text-os-accent">85%</span>
              </li>
              <li className="flex justify-between">
                <span>Database Management</span>
                <span className="font-medium text-os-accent">80%</span>
              </li>
              <li className="flex justify-between">
                <span>DevOps & Deployment</span>
                <span className="font-medium text-os-accent">75%</span>
              </li>
              <li className="flex justify-between">
                <span>UI/UX Design</span>
                <span className="font-medium text-os-accent">78%</span>
              </li>
            </ul>
          </div>
          
          <div className="border border-border rounded-lg p-5 bg-card">
            <h2 className="text-lg font-semibold mb-3">Development Tools</h2>
            <ul className="space-y-1">
              <li className="flex items-center">
                <span className="w-28">Git & GitHub</span>
                <div className="w-full bg-muted rounded-full h-2.5 ml-2">
                  <div className="bg-os-accent h-2.5 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </li>
              <li className="flex items-center">
                <span className="w-28">VS Code</span>
                <div className="w-full bg-muted rounded-full h-2.5 ml-2">
                  <div className="bg-os-accent h-2.5 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </li>
              <li className="flex items-center">
                <span className="w-28">Webpack</span>
                <div className="w-full bg-muted rounded-full h-2.5 ml-2">
                  <div className="bg-os-accent h-2.5 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </li>
              <li className="flex items-center">
                <span className="w-28">Docker</span>
                <div className="w-full bg-muted rounded-full h-2.5 ml-2">
                  <div className="bg-os-accent h-2.5 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </li>
              <li className="flex items-center">
                <span className="w-28">NGINX</span>
                <div className="w-full bg-muted rounded-full h-2.5 ml-2">
                  <div className="bg-os-accent h-2.5 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </li>
              <li className="flex items-center">
                <span className="w-28">PM2</span>
                <div className="w-full bg-muted rounded-full h-2.5 ml-2">
                  <div className="bg-os-accent h-2.5 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsMonitor;
