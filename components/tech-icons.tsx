import type { ReactNode } from "react"
import {
  SiJavascript,
  SiPython,
  SiReact,
  SiVuedotjs,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiGit,
  SiFigma,
  SiHtml5,
  SiCss3,
  SiJira,
  SiTailwindcss,
  SiBootstrap,
  SiAngular,
  SiGithub,
  SiDocker,
  SiVite,
  SiNestjs,
  SiDjango,
  SiPostgresql,
} from "react-icons/si"

import { FaCloud } from "react-icons/fa"

type TechIconProps = {
  name: string
}

export default function TechIcon({ name }: TechIconProps): ReactNode {
  const iconClassName = "h-6 w-6"

  const icons: Record<string, ReactNode> = {
    JavaScript: <SiJavascript className={iconClassName} />,
    Python: <SiPython className={iconClassName} />,
    "React.js": <SiReact className={iconClassName} />,
    "Vue.js": <SiVuedotjs className={iconClassName} />,
    "Next.js": <SiNextdotjs className={iconClassName} />,
    TypeScript: <SiTypescript className={iconClassName} />,
    "Node.js": <SiNodedotjs className={iconClassName} />,
    "Express.js": <SiExpress className={iconClassName} />,
    MongoDB: <SiMongodb className={iconClassName} />,
    MySQL: <SiMysql className={iconClassName} />,
    Git: <SiGit className={iconClassName} />,
    Figma: <SiFigma className={iconClassName} />,
    HTML5: <SiHtml5 className={iconClassName} />,
    CSS3: <SiCss3 className={iconClassName} />,
    Scrum: <SiJira className={iconClassName} />,
    TailwindCSS: <SiTailwindcss className={iconClassName} />,
    Bootstrap: <SiBootstrap className={iconClassName} />,
    Angular: <SiAngular className={iconClassName} />,
    GitHub: <SiGithub className={iconClassName} />,
    Jira: <SiJira className={iconClassName} />,
    Docker: <SiDocker className={iconClassName} />,
    Vite: <SiVite className={iconClassName} />,
    NestJS: <SiNestjs className={iconClassName} />,
    Django: <SiDjango className={iconClassName} />,
    PostgreSQL: <SiPostgresql className={iconClassName} />,
    Azure: <FaCloud className={`${iconClassName} text-blue-500`} />,
  }

  return icons[name] || null
}

