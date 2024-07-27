declare module '*.mp4' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const content: React.FC<React.SVGProps<SVGElement>>
  export default content
}