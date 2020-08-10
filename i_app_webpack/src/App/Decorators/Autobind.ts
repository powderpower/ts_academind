export default function Autobind(
    _target:any,
    _methodName: string,
    descriptor: PropertyDescriptor
) {
    const originMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            return originMethod.bind(this);
        }
    }

    return adjDescriptor;
}