/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { graphql, compose, ChildProps } from 'react-apollo';
import gql from 'graphql-tag';
// import * as hljs from 'highlight.js';

import { Atom as AtomModel } from '../../../models/atom/atom.model';

// import { IRootState } from '../../../reducer/reducer.config';
import NotFound from '../NotFoundPage/NotFoundPage';
import PanelSection from './sections/PanelSection.container';
import PreviewSection from './sections/PreviewSection.container';



/**
 * @desc Represents Atom Detail Page
 * @class ComponentPageContainer
 * @extends {React.Component}
 * @returns component page view (Stateful component)
 */
class AtomDetailsPageContainer extends React.Component<ChildProps<InputProps, Response>, {}> {

    
    /*        METHODS         */
    /**************************/ 
    getId() {
        return this.props.data.loading;
    }


    /*         RENDER         */
    /**************************/
    render() {

        
        /*       PROPERTIES       */
        /**************************/
        const {loading, error, atomById} = this.props.data;


        /*       VALIDATIONS       */
        /***************************/
        if (loading) {
            return (
                <div className="fontSize-xxl fontFamily-poppins fontSmoothing-reset flex-center mt-5">
                    Loading...
                </div>
            );
        }

        if (error) {
            return (<p>{error.message}</p>);
        }

        if (atomById === null) {
            return (<NotFound />);
        }


        /*         MARKUP          */
        /***************************/
        return (
            <div className="ComponentPage row sp-bg-darkSnow no-gutters">

                {/* Left Column: Panel Section */}
                <div className="leftCol col-12 col-sm-5 order-12 order-sm-12 sp-bg-slate">
                    <PanelSection options={atomById}/>
                </div>

                {/* Right Column: Preview */}
                <div className="rightCol col-12 col-sm-7 order-1 order-sm-1 mb-5 mb-sm-0 sp-bg-darkSnow">
                    <PreviewSection data={atomById}/>
                </div>

            </div>
        );
    }

}


const getAtomByIdQuery = gql`
            query atomById ($id: ID!) {
                atomById(id: $id) {
                    id
                    name
                    html
                    css
                    contextualBg
                    stores
                    views
                    likes
                    download
                    active
                    private
                    author {
                        id
                        firstname
                        lastname
                    }
                    __typename
                }
            }
        `;

type Response = {
    atomById: AtomModel;
};

type InputProps = {
    match: {
        params: {
            id: number
        }
    }
};

/* Export */
export default compose(
    graphql<Response, InputProps>(getAtomByIdQuery, {
        options: (ownProps: InputProps) => (
            { 
                variables: 
                { 
                    id: ownProps.match.params.id 
                } 
            }
        )
    })
)(AtomDetailsPageContainer);