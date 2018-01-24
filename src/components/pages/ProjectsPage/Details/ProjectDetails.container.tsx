/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { graphql, compose, ChildProps } from 'react-apollo';

import { Color as ColorModel } from '../../../../models/color/color.model';

import { GET_PROJECT_BY_ID_QUERY, GetByIdResponse } from './../../../../models/project/project.query';

import Header from './../Header/Header';
import ColorBoxesList from './../../../common/ColorBoxesList/ColorBoxesList';
import AtomsListContainer from './AtomsList/AtomsList.container';
import NotFound from './../../NotFoundPage/NotFoundPage';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type ProjectDetailsProps = {};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class ProjectDetails
extends React.Component<ChildProps<ProjectDetailsProps & StateProps, GetByIdResponse>, LocalStates> {
    
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<ProjectDetailsProps & StateProps, GetByIdResponse>) {
        super(props);
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/


    /**
     * @desc Build Color type sction component
     * @method _buildColorTypeSection
     * @example this._buildColorTypeSection()
     * @private
     * @returns {JSX.Element} <AddColorForm />
     */
    private _buildColorTypeSection(type: string): JSX.Element {

        // Destructuring state
        const { colorPalette } = this.props.data.projectById;

        // VARIABLES
        let newColorsArray: Array<ColorModel> = [];
        let title = {
            primary: 'Primary colors',
            secondary: 'Secondary colors',
            grayscale: 'Grayscale colors'
        };

        // Create new colors array based on type
        if (colorPalette.length > 0) {
            newColorsArray = colorPalette.filter((color: ColorModel) => {
                return color.type === type;
            });
        }

        if (newColorsArray.length > 0) {
            return (
                <div className="mt-4">
    
                    {/* Title Section */}
                    <div className="width-wrapper">
                        <h3 className="color-silver">{title[type]}</h3>
                    </div>
    
                    {/* Color Boxes List */}
                    <ColorBoxesList colorPalette={newColorsArray}/>
    
                </div>
            );
        }

        return (<div />);
        
    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {


        /*       PROPERTIES       */
        /**************************/
        const {
            data: {loading, error, projectById},
        } = this.props;


        /*       VALIDATIONS       */
        /***************************/
        if (loading) {
            return (
                <div className="color-slate fontSize-xxl fontFamily-poppins fontSmoothing-reset flex-center mt-5 h-100">
                    Loading project...
                </div>
            );
        }

        if (error) {
            return (<p>{error.message}</p>);
        }

        if (projectById === null) {
            return (<NotFound />);
        }

        
        /*         MARKUP          */
        /***************************/
        return (
            <div className="ProjectDetails">

                {/* Header */}
                <div className="mb-5">
                    <Header projectName={projectById.name}
                            projectWebsite={projectById.website} 
                            projectDescription={projectById.description}
                            isPrivate={projectById.private} />
                </div>

                {/* Color Palette Section */}
                <div className="ColorPaletteSection">
                    
                    <div className="width-wrapper mb-4">
                        <h2 className="color-silver fontWeight-7 fontFamily-openSans fontSize-xl">
                            Color Palette
                        </h2>
                    </div>

                    {/* Primary Colors Section */}
                    {this._buildColorTypeSection('primary')}

                    {/* Secondary Colors Section */}
                    {this._buildColorTypeSection('secondary')}

                    {/* Grayscale Colors Section */}
                    {this._buildColorTypeSection('grayscale')}

                </div>


                <div className="sp-divider sp-divider--smoke sp-divider--border-2 my-5 mx-4 width-wrapper" />


                {/* Components Section */}
                <div className="ComponentsSection">

                    <div className="width-wrapper mb-4">
                        <h2 className="color-silver fontWeight-7 fontFamily-openSans fontSize-xl">
                            Components
                        </h2>
                    </div>

                    {/* Atoms list container */}
                    <AtomsListContainer projectId={projectById.id}/>

                </div>

            </div>
        );

    }

}


/********************************/
/*            QUERY             */
/********************************/

// Params types
type InputProps = {
    match: {
        params: {
            id: number
        }
    }
};

// Query options
const config = {
    options: (ownProps: InputProps) => (
        { 
            variables: 
            { 
                id: ownProps.match.params.id
            } 
        }
    )
};

// Query
const getProjectByIdQuery = graphql<GetByIdResponse, ProjectDetailsProps>(
    GET_PROJECT_BY_ID_QUERY, config
);


/*         EXPORT          */
/***************************/
export default compose(
    getProjectByIdQuery
)(ProjectDetails);