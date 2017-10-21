/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';


// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

interface IconType {
    arrowDown: () => void;
    chevronDown: () => void;
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
            iconClass = 'sp-bg-black'
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
            }
        };

        return svg[icon || 'default']();
    }

}


/* Export */
export default Icon;