/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { graphql, compose, ChildProps } from 'react-apollo';

import { IRootState } from './../../../../../reducer/reducer.config';

import { Preprocessor as PreprocessorModel } from './../../../../../models/preprocessor/preprocessor.model';
import { 
    GET_ALL_PREPROCESSORS_QUERY, 
    GetAllResponse 
} from './../../../../../models/preprocessor/preprocessor.query';
import { getCurrentPreprocessor } from './../../../../../selectors/preprocessor.selector';

import { changePreprocessorAction } from './../../../../../actions/preprocessor.action';

import SelectList from './../../../../components/Inputs/GenericSelectInput/GenericSelectInput';


// -----------------------------------


//        OWN PROPS & STATES      
// ===================================

/* Own Props */
type PreprocessorSelectListProps = {
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
};

/* Own States */
type LocalStates = {};


//    REDUX MAPPED PROPS & STATES
// ===================================

/* Mapped State to Props */
type StateProps = {
    preprocessor: PreprocessorModel
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: {
            changePreprocessor: (preprocessor: any) => void;
        }
    };
};


//     ALL PROPS (EXTERNAL & OWN)
// ===================================   

type AllProps = 
    PreprocessorSelectListProps
&   StateProps    
&   DispatchProps;



/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class PreprocessorSelectListContainer 
extends React.Component<ChildProps<AllProps, GetAllResponse>, LocalStates> {
    
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<AllProps, GetAllResponse>) {
        super(props);

        // Bind methods
        this.handleChange = this.handleChange.bind(this);
    }


    /********************************/
    /*        PUBLIC METHODS        */
    /********************************/

    /**
     * @desc Handle Change
     * @method handleChange
     * @example this.handleChange()
     * @public
     * @returns {void}
     */
    handleChange(e: React.ChangeEvent<HTMLSelectElement>) {

        e.preventDefault();

        // VARIABLES
        let value = e.target.value;

        // If receive an parent's onChange method
        if (this.props.onChange) {
            this.props.onChange(e);
        } else {
            // If not receive a parent's onChange method, default action.
            this.props.actions.ui.changePreprocessor({ value });
        }

    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        /*       PROPERTIES       */
        /**************************/
        const {...data} = this.props.data;
        const { preprocessor } = this.props;
            
        
        /*         MARKUP          */
        /***************************/
        return (
            <SelectList value={preprocessor.id}
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
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {
    return {
        preprocessor: getCurrentPreprocessor(state)
    };
}


/********************************/
/*     MAP DISPATCH TO PROPS    */
/********************************/
function mapDispatchToProps(dispatch: Dispatch<IRootState>): DispatchProps {
    return {
        actions: {
            ui: {
                changePreprocessor: (preprocessor: any) => dispatch(changePreprocessorAction(preprocessor))
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const preprocessorSelectListContainerConnect = connect(mapStateToProps, mapDispatchToProps); 


/********************************/
/*            QUERY             */
/********************************/
const getAllPreprocessorsQuery = graphql<GetAllResponse, PreprocessorSelectListProps>(
    GET_ALL_PREPROCESSORS_QUERY
);


/*         EXPORT          */
/***************************/
export default compose(
    preprocessorSelectListContainerConnect,
    getAllPreprocessorsQuery
)(PreprocessorSelectListContainer);