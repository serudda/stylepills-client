/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { graphql, compose, ChildProps } from 'react-apollo';

import { 
    GET_BASIC_PROJECTS_BY_USER_ID_QUERY, 
    GetBasicProjectsByUserIdResponse  
} from './../../../../../../models/project/project.query';

import SelectList from './../../../../../components/Inputs/GenericSelectInput/GenericSelectInput';
import CreateProjectLink from './../components/CreateProjectLink';


// -----------------------------------


//        OWN PROPS & STATES      
// ===================================

/* Own Props */
type ProjectSelectListProps = {
    userId: number,
    onChange: (name: string, value: string) => void
};

/* Own States */
type LocalStates = {
    value: string
};


//     ALL PROPS (EXTERNAL & OWN)
// ===================================   

type AllProps = ProjectSelectListProps;



/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class ProjectSelectListContainer 
extends React.Component<ChildProps<AllProps, GetBasicProjectsByUserIdResponse>, LocalStates> {
    
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<AllProps, GetBasicProjectsByUserIdResponse>) {
        super(props);

        // Init state
        this.state = {
            value: ''
        };

        // Bind methods
        this.handleChange = this.handleChange.bind(this);

    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/

    /**
     * @desc Handle Select List Change
     * @method handleChange
     * @example this.handleChange()
     * @public
     * @param {any} e - Event
     * @returns {void}
     */
    handleChange (e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault();

        // VARIABLES
        let value = e.target.value;
        let name = e.target.name;

        // Update the state
        this.setState((previousState) => {
            return { ...previousState, value };
        }, () => {
            this.props.onChange(name, value);
        });

    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        /*       PROPERTIES       */
        /**************************/
        const {...data} = this.props.data;
        

        /* Show 'Create Project' if user doesn't have projects yet */
        if (data.projectsByUserId.length === 0) {
            return (
              <CreateProjectLink />  
            );
        }
            
        
        /*         MARKUP          */
        /***************************/
        return (
            <SelectList value={this.state.value}
                        name="projectId"
                        isBlock={true}
                        defaultOption="Don't associate with a project"
                        options={data.projectsByUserId ? data.projectsByUserId : null}
                        loading={data.loading}
                        error={data.error}
                        onChange={this.handleChange}/>
        );

    }

}


/********************************/
/*            QUERY             */
/********************************/

// Query options
const config = {
    options: (ownProps: AllProps) => {
        return { 
            variables: 
            { 
                userId: ownProps.userId
            } 
        };
    }
};

// Query
const getBasicProjectsByUserIdQuery = graphql<GetBasicProjectsByUserIdResponse, ProjectSelectListProps>(
    GET_BASIC_PROJECTS_BY_USER_ID_QUERY, config
);



/*         EXPORT          */
/***************************/
export default compose(
    getBasicProjectsByUserIdQuery
)(ProjectSelectListContainer);