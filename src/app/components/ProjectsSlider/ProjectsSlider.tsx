/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { Link } from 'react-router-dom';

import { Project as ProjectModel } from '../../../models/project/project.model';

const CarouselSlider = require('react-carousel-slider').default;

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type ProjectsSliderProps = {
    loading: boolean,
    error: any,
    results: Array<ProjectModel>,
    onTrackClick?: (elementType: string, elementProps: any) => any
};


/**
 * @desc Represent Projects Slider
 * @function ProjectsSlider
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */
class ProjectsSlider extends React.Component<ProjectsSliderProps, {}> {

    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ProjectsSliderProps) {
        super(props);
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/

    /**
     * @desc Build No Data Message
     * @method _buildNoData
     * @example this._buildNoData()
     * @private
     * @returns {JSX.Element}
     */
    private _buildNoData(): JSX.Element {
        return ( 
            <div className="fontSize-xxl">
                No projects found
            </div>
        );
    }

    /**
     * @desc Build Loading screen
     * @method _buildLoading
     * @example this._buildLoading()
     * @private
     * @returns {JSX.Element}
     */
    private _buildLoading(): JSX.Element {
        return ( 
            <div className="fontSize-xxl fontFamily-poppins color-silver fontSmoothing-reset flex-center mt-5"
                 style={{height: '240px'}}>
                Loading...
            </div> 
        );
    }

    /**
     * @desc Build Project Card
     * @method _buildProjectCard
     * @example this._buildProjectCard()
     * @private
     * @returns {Array<JSX.Element>}
     */
    private _buildProjectCard(): Array<JSX.Element> {

        // Destructuring props
        const {results} = this.props;
        const {onTrackClick} = this.props;

        return ( 
            results.map((project, index) => (
                <Link key={index} to={`/project/${project.id}`}
                      onClick={onTrackClick('PROJECT CARD ON SLIDER', {projectId: project.id, component: 'ProjectsSlider'})}>
                    <div className="Slider__container sp-bg-silver border-6 borderColor-white position-relative boxShadow-raised borderRadius-md">
                        <img className="Slider__container__image" 
                            width="200" height="200" src={project.logoUrl} alt={project.name} />
                        <div className="Slider__container__footer position-absolute p-2 w-100">
                            <div className="fontSize-md color-white textShadow-close fontWeight-9">
                                {project.name}
                            </div>
                            <div className="fontSize-sm color-white textShadow-close">
                                {project.author.firstname}
                            </div>
                        </div>
                    </div>
                </Link>
            ))
        );
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props
        const {results, loading, error} = this.props;
        const { onTrackClick } = this.props;

        const itemsStyle = {
            margin: '0 10px'
        };

        const rBtnCpnt = (
            <div className="Slider__btn"
                 onClick={onTrackClick('RIGHT PROJECT SLIDER BTN', {component: 'ProjectsSlider'})}>
                <div className="icon material-icons color-silver">chevron_right</div>
            </div>
        );
    
        const lBtnCpnt = (
            <div className="Slider__btn"
                 onClick={onTrackClick('LEFT PROJECT SLIDER BTN', {component: 'ProjectsSlider'})}>
                <div className="icon material-icons color-silver" >chevron_left</div>
            </div>
        );


        /*       VALIDATIONS       */
        /***************************/
        if (loading) {
            return this._buildLoading();
        }

        if (error) {
            return (<p>{error.message}</p>);
        }

        if (results.length === 0) {
            return this._buildNoData();
        }


        /*         MARKUP          */
        /***************************/
        return (
            <div className="Slider">
                <CarouselSlider 
                    sliderBoxStyle={{height: '450px', width: '80%', background: 'transparent'}} 
                    accEle={{dots: false}}
                    slideCpnts={this._buildProjectCard()} 
                    itemsStyle={itemsStyle} 
                    buttonSetting={{placeOn: 'middle-outside'}}
                    rBtnCpnt={rBtnCpnt}
                    lBtnCpnt={lBtnCpnt}
                />
            </div>
        );

    }
    
}


/* Export */
export default ProjectsSlider;