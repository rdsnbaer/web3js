import isFunction from 'lodash/isFunction';
import AbstractMethod from '../../../lib/methods/AbstractMethod';

export default class GetSuccessPendingOrderMethod extends AbstractMethod {
    /**
     * @param {Utils} utils
     * @param {Object} formatters
     * @param {AbstractWeb3Module} moduleInstance
     *
     * @constructor
     */
    constructor(utils, formatters, moduleInstance) {
        super('brc_getSuccessPendingOrder', 2, utils, formatters, moduleInstance);
    }

    /**
     * This method will be executed before the RPC request.
     *
     * @method beforeExecution
     *
     * @param {AbstractWeb3Module} moduleInstance - The package where the method is called from for example Eth.
     */
    beforeExecution(moduleInstance) {
        //this.parameters[0] = this.formatters.inputAddressFormatter(this.parameters[0]);
		//this.parameters[1] = this.formatters.inputAddressFormatter(this.parameters[1]);
		//this.parameters[2] = this.formatters.inputAddressFormatter(this.parameters[2]);

        // Optional second parameter 'defaultBlock' could also be the callback
        if (isFunction(this.parameters[1])) {
            this.callback = this.parameters[1];
            this.parameters[1] = moduleInstance.defaultBlock;
        }

        this.parameters[1] = this.formatters.inputDefaultBlockNumberFormatter(this.parameters[1], moduleInstance);
    }

    /**
     * This method will be executed after the RPC request.
     *
     * @method afterExecution
     *
     * @param {Object} response
     *
     * @returns {BigNumber}
     */
    afterExecution(response) {
        return response;
    }
}
