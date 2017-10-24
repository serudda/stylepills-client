/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';


// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

interface IconType {
    arrowDown: () => JSX.Element;
    chevronDown: () => JSX.Element;
    heart: () => JSX.Element;
    messageCircle: () => JSX.Element;
    package: () => JSX.Element;
    eye: () => JSX.Element;
    search: () => JSX.Element;
}

/* Own Props */
type IconProps = {
    color?: string,
    width: string,
    height: string,
    icon: string,
    iconClass?: string
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class Icon extends React.Component<IconProps, {}> {

    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor() {
        super();
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        /*       PROPERTIES       */
        /**************************/
        const {
            color = '#000',
            width = '24px',
            height = '24px',
            icon = 'default',
            iconClass = 'stroke-black'
        } = this.props;

        const svg: IconType = {
            arrowDown: () => {
                return (
                    <svg className={iconClass}
                         width={width}
                         height={height}
                         viewBox="0 0 24 24" 
                         fill="none" 
                         stroke={color}
                         strokeWidth="2"
                         strokeLinecap="round" 
                         strokeLinejoin="round"
                         xmlns="http://www.w3.org/2000/svg">
                         <line x1="12" y1="4" x2="12" y2="20" />
                         <polyline points="18 14 12 20 6 14" />
                    </svg>
                );
            },
            chevronDown: () => {
                return (
                    <svg className={iconClass}
                         width={width}
                         height={height}
                         viewBox="0 0 24 24"
                         fill="none"
                         stroke={color}
                         strokeWidth="2"
                         strokeLinecap="round"
                         strokeLinejoin="round"
                         xmlns="http://www.w3.org/2000/svg">
                         <polyline points="6 9 12 15 18 9" />
                    </svg>
                );
            },
            heart: () => {
                return (
                    <svg className={iconClass}
                         width={width}
                         height={height}
                         viewBox="0 0 24 24" 
                         fill="none" 
                         stroke={color}
                         strokeWidth="2"
                         strokeLinecap="round"
                         strokeLinejoin="round"
                         xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                );
            },
            messageCircle: () => {
                return (
                    <svg className={iconClass}
                         width={width}
                         height={height}
                         viewBox="0 0 24 24" 
                         fill="none" 
                         stroke={color}
                         strokeWidth="2"
                         strokeLinecap="round"
                         strokeLinejoin="round"
                         xmlns="http://www.w3.org/2000/svg">
                         <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                );
            },
            package: () => {
                return (
                    <svg className={iconClass}
                         width={width}
                         height={height}
                         viewBox="0 0 24 24" 
                         fill="none" 
                         stroke={color}
                         strokeWidth="2"
                         strokeLinecap="round"
                         strokeLinejoin="round"
                         xmlns="http://www.w3.org/2000/svg">
                         <path d="M12.89 1.45l8 4A2 2 0 0 1 22 7.24v9.53a2 2 0 0 1-1.11 1.79l-8 4a2 2 0 0 1-1.79 0l-8-4a2 2 0 0 1-1.1-1.8V7.24a2 2 0 0 1 1.11-1.79l8-4a2 2 0 0 1 1.78 0z" />
                         <polyline points="2.32 6.16 12 11 21.68 6.16" />
                         <line x1="12" y1="22.76" x2="12" y2="11" />
                         <line x1="7" y1="3.5" x2="17" y2="8.5" />
                    </svg>
                );
            },
            eye: () => {
                return (
                    <svg className={iconClass}
                         width={width}
                         height={height}
                         viewBox="0 0 24 24" 
                         fill="none" 
                         stroke={color}
                         strokeWidth="2"
                         strokeLinecap="round"
                         strokeLinejoin="round"
                         xmlns="http://www.w3.org/2000/svg">
                         <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                         <circle cx="12" cy="12" r="3" />
                    </svg>
                );
            },
            search: () => {
                return (
                    <svg className={iconClass}
                         width={width}
                         height={height}
                         viewBox="0 0 24 24" 
                         fill="none" 
                         stroke={color}
                         strokeWidth="2"
                         strokeLinecap="round"
                         strokeLinejoin="round"
                         xmlns="http://www.w3.org/2000/svg">
                         <circle cx="10.5" cy="10.5" r="7.5" />
                         <line x1="21" y1="21" x2="15.8" y2="15.8" />
                    </svg>
                );
            }
        };

        return svg[icon || 'default']();
    }

}


/* Export */
export default Icon;