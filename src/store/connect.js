import {store} from './index';

export default (
    mapStateToProps,
    mapDispatchToEvents,
) => superclass => {
    class connected extends superclass {

        connectedCallback() {
            if (super.connectedCallback) {
                super.connectedCallback();
            }

            if (mapDispatchToEvents) {
                this.dispatchMap = mapDispatchToEvents(store.dispatch, this);
                Object.entries(this.dispatchMap).forEach(([key, fn]) => {
                    this[key] = fn;
                });
            }

            if (mapStateToProps) {
                this.updateStateProps = () => {
                    const newValues = Object.entries(mapStateToProps(store.getState(), this))
                        .filter(([key, value]) => value !== this[key])
                        .reduce((acc, [key, value]) => ({...acc, [key]: value}), {});
                    Object.assign(this, newValues);

                };
                this.unsubscribe = store.subscribe(this.updateStateProps);

                this.updateStateProps();
            }

            this.__connected = true;
            if (this.afterConnect)  {
                this.afterConnect();
            }
        }

        disconnectedCallback() {
            if (this.beforeDisconnect)  {
                this.beforeDisconnect();
            }
            if (this.unsubscribe) {
                this.unsubscribe();
                this.unsubscribe = null;
            }

            if (this.dispatchMap) {
                for (let key in this.dispatchMap) {
                    this.removeEventListener(key, this.dispatchMap[key], false);
                }
            }

            if (super.disconnectedCallback) {
                super.disconnectedCallback();
            }
        }
    }


    return connected;
}