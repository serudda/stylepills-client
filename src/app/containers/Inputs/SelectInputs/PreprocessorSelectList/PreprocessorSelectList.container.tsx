/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { graphql, compose, ChildProps } from 'react-apollo';

import { 
    GET_ALL_PREPROCESSORS_QUERY, 
    GetAllResponse 
} from './../../../../../models/preprocessor/preprocessor.query';

import SelectList from './../../../../components/Inputs/GenericSelectInput/GenericSelectInput';


// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type PreprocessorSelectListProps = {
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
};

/* Own States */
type LocalStates = {
    value: string
};

/* Mapped State to Props */
type StateProps = {};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class PreprocessorSelectListContainer 
extends React.Component<ChildProps<PreprocessorSelectListProps & StateProps, GetAllResponse>, LocalStates> {
    
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<PreprocessorSelectListProps & StateProps, GetAllResponse>) {
        super(props);

        // Init state
        this.state = {
            value: ''
        };

        // Bind methods
        this.handleChange = this.handleChange.bind(this);
    }


    /********************************/
    /*        PUBLIC METHODS        */
    /********************************/

    /**
     * @desc Handle Select List Change
     * @method handleChange
     * @example this.handleChange()
     * @public 
     * @param {AtomModel} atom - atom data
     * @param {any} e - Event
     * @returns {void}
     */
    handleChange (e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault();

        if (this.props.onChange) {
            this.props.onChange(e);
        } else {
            // VARIABLES
            let value = e.target.value;

            // Update the state
            this.setState((previousState) => {
                return { ...previousState, value };
            });
        }
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
            <SelectList value={this.state.value}
                        name="preprocessor"
                        isBlock={true}
                        defaultOption="None"
                        options={data.allPreprocessors ? data.allPreprocessors : null}
                        loading={data.loading}
                        error={data.error}
                        onChange={this.handleChange}/>
        );

    }

}


/********************************/
/*            QUERY             */
/********************************/
const getAllPreprocessorsQuery = graphql<GetAllResponse, PreprocessorSelectListProps>(
    GET_ALL_PREPROCESSORS_QUERY
);


/*         EXPORT          */
/***************************/
export default compose(
    getAllPreprocessorsQuery
)(PreprocessorSelectListContainer);