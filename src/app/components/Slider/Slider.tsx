/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

const CarouselSlider = require('react-carousel-slider').default;

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type SliderProps = {
};


/**
 * @desc Represent Slider Options
 * @function SliderOptions
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */
const Slider: React.SFC<SliderProps> = ({}) => {

    const data = {
        'Scientists': {

            'items': [
                {
                    'imgSrc': 'https://s3.amazonaws.com/waysily-img/stylepill/projects-logo/boostrap4.png',
                    'name': 'Boostrap 4',
                    'des': 'by Rosa Alvarez'
                },
                {
                    'imgSrc': 'https://s3.amazonaws.com/waysily-img/stylepill/projects-logo/bulma.png',
                    'name': 'Bulma',
                    'des': 'by Firat Diaz'
                },
                {
                    'imgSrc': 'https://s3.amazonaws.com/waysily-img/stylepill/projects-logo/pureCSS.png',
                    'name': 'Pure CSS',
                    'des': 'by Marcos Alonso'
                },
                {
                    'imgSrc': 'https://s3.amazonaws.com/waysily-img/stylepill/projects-logo/materialize.png',
                    'name': 'Materialize',
                    'des': 'by Rosa Alvarez'
                },
                {
                    'imgSrc': 'https://s3.amazonaws.com/waysily-img/stylepill/projects-logo/foundation.png',
                    'name': 'Foundation',
                    'des': 'by Sergio Ruiz'
                }
            ]
        }
    };

    const itemsStyle = {
        margin: '0 30px'
    };

    const scientists = data.Scientists.items.map((item, index) => (
            <div key={index} 
                 className="Slider__container sp-bg-silver border-6 borderColor-white position-relative boxShadow-raised borderRadius-md">
                <img className="Slider__container__image" 
                     width="200" height="200" src={item.imgSrc} alt={item.name} />
                <div className="Slider__container__footer position-absolute p-2 w-100">
                    <div className="fontSize-md color-white textShadow-close fontWeight-9">
                        {item.name}
                    </div>
                    <div className="fontSize-sm color-white textShadow-close">
                        {item.des}
                    </div>
                </div>
            </div>
        ) 
    );

    const rBtnCpnt = (
        <div className="Slider__btn">
            <div className="icon material-icons color-silver">chevron_right</div>
        </div>
    );

    const lBtnCpnt = (
        <div className="Slider__btn">
            <div className="icon material-icons color-silver" >chevron_left</div>
        </div>
    );

    const scientistsCard = (
        <CarouselSlider 
            sliderBoxStyle={{height: '450px', width: '80%', background: 'transparent'}} 
            accEle={{dots: false}}
            slideCpnts={scientists} 
            itemsStyle={itemsStyle} 
            buttonSetting={{placeOn: 'middle-outside'}}
            rBtnCpnt={rBtnCpnt}
            lBtnCpnt={lBtnCpnt}
        />
    );
    

    /*         MARKUP          */
    /***************************/
    return (
        <div className="Slider" >
            {scientistsCard}
        </div>
    );
    
};


/* Export */
export default Slider;