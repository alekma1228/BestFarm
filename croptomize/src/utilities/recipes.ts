/**
 * takes any prop value from an styled component
 * must pass generic with props type
 * @param key of Prop in styled component
 */
export const extractProp = <P extends {}>(key: keyof P, or?: any) => (props: P) => props[key] || or
