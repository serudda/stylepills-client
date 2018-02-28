/********************************/
/*         DEPENDENCIES         */
/********************************/

import { Source as SourceModel } from './source.model';
import { Preprocessor as PreprocessorModel } from '../preprocessor/preprocessor.model';

// -----------------------------------


/**********************************/
/*           INTERFACES           */
/**********************************/

export interface ISourceService {
    createSourceObjBasedOnCurrentPreprocessor: (preprocessor: PreprocessorModel) => SourceModel;
}


/***************************************/
/*            CONFIG CLASS             */
/***************************************/
class SourceService implements ISourceService {


    /*       METHODS       */
    /***********************/
    
    /**
     * @desc Create Source object based on current preprocessor
     * @function createSourceObjBasedOnCurrentPreprocessor
     * @example this.createSourceObjBasedOnCurrentPreprocessor(preprocessor)
     * @public
     * @param {PreprocessorModel} preprocessor - External Libs List
     * @returns {SourceModel} source object based on current preprocessor
     */
    createSourceObjBasedOnCurrentPreprocessor (preprocessor: PreprocessorModel): SourceModel {

        let source: SourceModel = {
            code: '',
            name: '',
            filename: '',
            preprocessor,
            order: 1
        };

        return source;

    }

}


/* Export instance */
export default new SourceService();