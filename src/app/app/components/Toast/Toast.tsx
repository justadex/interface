// import toast from "react-hot-toast";

// export const MyToast = (swapTokensPromise:any, loadingText:string) => {
//     return toast.promise(swapTokensPromise, {
//         loading: loadingText,
//         success: 'Tokens swapped successfully',
//         error: 'Transaction Failed',
//     }).then(() => {
//         return;
//     }).catch((e) => {
//         return;
//     });
// }

export const Toast = ({ text }: { text: string }) => {
    return (
        <div className="fixed top-4 right-4 bg-white text-primary rounded shadow-xl w-56 px-8 py-4 z-50">
            {text}
        </div>
    )
}