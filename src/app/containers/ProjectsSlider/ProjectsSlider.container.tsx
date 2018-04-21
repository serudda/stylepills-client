/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { graphql, compose, ChildProps } from 'react-apollo';

import { 
    GET_ALL_PROJECT_QUERY, 
    GetAllResponse
} from './../../../models/project/project.query';

import { withClickTracker, 
    InjectedProps as WithClickTrackerProps 
  } from './../../../core/hocs/withClickTracker.hoc';

import ProjectsSlider from './../../components/ProjectsSlider/ProjectsSlider';


// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type SliderContainerProps = {};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        search: {
            searchAtoms: (filters: any) => void;
        }
    };
};


//     ALL PROPS (EXTERNAL & OWN)
// ===================================   

type AllProps =    
    SliderContainerProps
&   StateProps
&   DispatchProps
&   WithClickTrackerProps;


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class SliderContainer 
extends React.Component<ChildProps<AllProps, GetAllResponse>, LocalStates> {
    
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<AllProps, GetAllResponse>) {
        super(props);
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        /*       PROPERTIES       */
        /**************************/
        const {...data} = this.props.data;
            
        
        /*         MARKUP          */
        /***************************/
        return (
            
            <ProjectsSlider results={data.allProjects ? data.allProjects : null}
                            loading={data.loading}
                            error={data.error}
                            onTrackClick={this.props.onTrackClick} />

        );

    }

}


/********************************/
/*            QUERY             */
/********************************/
// Query options
const config = {
    options: () => (
        { 
            variables: 
            { 
                limit: 10
            } 
        }
    )
};

// Query
const getAllProjectQuery = graphql<GetAllResponse, SliderContainerProps>(
    GET_ALL_PROJECT_QUERY, config
); 


/**************************************/
/*     WITH CHANGE SOURCE CODE HOC    */
/**************************************/
const withClickTrackerConnect = withClickTracker();


/*         EXPORT          */
/***************************/
export default compose(
    getAllProjectQuery,
    withClickTrackerConnect
)(SliderContainer);