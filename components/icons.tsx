import { SVGProps } from 'react';

export function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 8 6" aria-hidden="true" {...props}>
      <path
        d="M1.75 1.75 4 4.25l2.25-2.5"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 8 6" aria-hidden="true" {...props}>
      <path
        d="M1.75 4.25 4 1.75l2.25 2.5"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6.75 5.75 9.25 8l-2.5 2.25"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SunIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M8 12.25A4.25 4.25 0 0 1 12.25 8v0a4.25 4.25 0 0 1 4.25 4.25v0a4.25 4.25 0 0 1-4.25 4.25v0A4.25 4.25 0 0 1 8 12.25v0Z" />
      <path
        d="M12.25 3v1.5M21.5 12.25H20M18.791 18.791l-1.06-1.06M18.791 5.709l-1.06 1.06M12.25 20v1.5M4.5 12.25H3M6.77 6.77 5.709 5.709M6.77 17.73l-1.061 1.061"
        fill="none"
      />
    </svg>
  );
}

export function MoonIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M17.25 16.22a6.937 6.937 0 0 1-9.47-9.47 7.451 7.451 0 1 0 9.47 9.47ZM12.75 7C17 7 17 2.75 17 2.75S17 7 21.25 7C17 7 17 11.25 17 11.25S17 7 12.75 7Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DownloadFileIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2zm-1 8V6h2v4h3l-4 4-4-4h3zm6 7H7v-2h10v2z"></path>
    </svg>
  );
}

export function ReloadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      {...props}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
      />
    </svg>
  );
}

export function InfoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill-rule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clip-rule="evenodd"
      ></path>
    </svg>
  );
}

export function ImageIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 640 512"
      {...props}
    >
      <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
    </svg>
  );
}

export function MagnifyingGlassIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}

export function AnchorIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );
}

export function ArrowLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CopyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
      />
    </svg>
  );
}

export function CopyDoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
      />
    </svg>
  );
}

export function LinkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function NotFoundIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="700pt"
      height="700pt"
      version="1.1"
      viewBox="0 0 700 700"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      {...props}
    >
      <g>
        <path d="m502.43 425.07c-2.2656-2.2188-5.0859-3.7812-8.168-4.5195-3.082-0.74219-6.3086-0.62891-9.332 0.32031l-33.25-33.426c34.688-39.039 46.422-93.379 30.934-143.25-15.488-49.871-55.941-88.008-106.64-100.53-50.699-12.52-104.25 2.3945-141.18 39.324-36.926 36.926-51.84 90.48-39.32 141.18 12.523 50.699 50.66 91.152 100.53 106.64 49.875 15.488 104.21 3.7539 143.25-30.934l33.426 33.426c-1.5977 5.8945-0.007812 12.195 4.1992 16.625l38.5 38.324c3.2578 3.2344 7.6602 5.0547 12.25 5.0742 4.6523 0.027343 9.1211-1.7969 12.426-5.0742 3.2578-3.2773 5.0898-7.7148 5.0898-12.336 0-4.625-1.832-9.0586-5.0898-12.34zm-253.93-43.574c-24.637-24.605-38.484-57.992-38.5-92.812-0.015625-34.816 13.809-68.215 38.422-92.84 24.617-24.629 58.008-38.465 92.828-38.465s68.211 13.836 92.828 38.465c24.613 24.625 38.438 58.023 38.422 92.84-0.015625 34.82-13.863 68.207-38.5 92.812-24.586 24.621-57.953 38.457-92.75 38.457s-68.164-13.836-92.75-38.457z" />
        <path d="m273.88 286.12c1.5859 1.6914 3.8047 2.6523 6.125 2.6523s4.5391-0.96094 6.125-2.6523l11.375-11.199 11.375 11.199c1.5859 1.6914 3.8047 2.6523 6.125 2.6523s4.5391-0.96094 6.125-2.6523c1.6914-1.5859 2.6523-3.8047 2.6523-6.125s-0.96094-4.5391-2.6523-6.125l-11.199-11.375 11.199-11.375c3.3828-3.3828 3.3828-8.8672 0-12.25s-8.8672-3.3828-12.25 0l-11.375 11.199-11.375-11.199c-3.3828-3.3828-8.8672-3.3828-12.25 0s-3.3828 8.8672 0 12.25l11.199 11.375-11.199 11.375c-1.6914 1.5859-2.6523 3.8047-2.6523 6.125s0.96094 4.5391 2.6523 6.125z" />
        <path d="m361.38 286.12c1.5859 1.6914 3.8047 2.6523 6.125 2.6523s4.5391-0.96094 6.125-2.6523l11.375-11.199 11.375 11.199c1.5859 1.6914 3.8047 2.6523 6.125 2.6523s4.5391-0.96094 6.125-2.6523c1.6914-1.5859 2.6523-3.8047 2.6523-6.125s-0.96094-4.5391-2.6523-6.125l-11.199-11.375 11.199-11.375c3.3828-3.3828 3.3828-8.8672 0-12.25s-8.8672-3.3828-12.25 0l-11.375 11.199-11.375-11.199c-3.3828-3.3828-8.8672-3.3828-12.25 0s-3.3828 8.8672 0 12.25l11.199 11.375-11.199 11.375c-1.6914 1.5859-2.6523 3.8047-2.6523 6.125s0.96094 4.5391 2.6523 6.125z" />
        <path d="m411.25 315h-140c-4.832 0-8.75 3.918-8.75 8.75s3.918 8.75 8.75 8.75h26.25v26.25c0 9.3789 5.0039 18.043 13.125 22.734 8.1211 4.6875 18.129 4.6875 26.25 0 8.1211-4.6914 13.125-13.355 13.125-22.734v-26.25h61.25c4.832 0 8.75-3.918 8.75-8.75s-3.918-8.75-8.75-8.75zm-78.75 43.75c0 4.832-3.918 8.75-8.75 8.75s-8.75-3.918-8.75-8.75v-26.25h17.5z" />
        <path d="m516.25 87.5c-11.602 0-22.73 4.6094-30.938 12.812-8.2031 8.207-12.812 19.336-12.812 30.938s4.6094 22.73 12.812 30.938c8.207 8.2031 19.336 12.812 30.938 12.812s22.73-4.6094 30.938-12.812c8.2031-8.207 12.812-19.336 12.812-30.938s-4.6094-22.73-12.812-30.938c-8.207-8.2031-19.336-12.812-30.938-12.812zm0 70c-6.9609 0-13.641-2.7656-18.562-7.6875s-7.6875-11.602-7.6875-18.562 2.7656-13.641 7.6875-18.562 11.602-7.6875 18.562-7.6875 13.641 2.7656 18.562 7.6875 7.6875 11.602 7.6875 18.562-2.7656 13.641-7.6875 18.562-11.602 7.6875-18.562 7.6875z" />
        <path d="m227.5 105c0-9.2812-3.6875-18.184-10.25-24.75-6.5664-6.5625-15.469-10.25-24.75-10.25s-18.184 3.6875-24.75 10.25c-6.5625 6.5664-10.25 15.469-10.25 24.75s3.6875 18.184 10.25 24.75c6.5664 6.5625 15.469 10.25 24.75 10.25s18.184-3.6875 24.75-10.25c6.5625-6.5664 10.25-15.469 10.25-24.75zm-52.5 0c0-4.6406 1.8438-9.0938 5.125-12.375s7.7344-5.125 12.375-5.125 9.0938 1.8438 12.375 5.125 5.125 7.7344 5.125 12.375-1.8438 9.0938-5.125 12.375-7.7344 5.125-12.375 5.125-9.0938-1.8438-12.375-5.125-5.125-7.7344-5.125-12.375z" />
        <path d="m218.75 455h-8.75v-8.75c0-4.832-3.918-8.75-8.75-8.75s-8.75 3.918-8.75 8.75v8.75h-8.75c-4.832 0-8.75 3.918-8.75 8.75s3.918 8.75 8.75 8.75h8.75v8.75c0 4.832 3.918 8.75 8.75 8.75s8.75-3.918 8.75-8.75v-8.75h8.75c4.832 0 8.75-3.918 8.75-8.75s-3.918-8.75-8.75-8.75z" />
      </g>
    </svg>
  );
}

export function TwitterIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M20.055 7.983c.011.174.011.347.011.523 0 5.338-3.92 11.494-11.09 11.494v-.003A10.755 10.755 0 0 1 3 18.186c.308.038.618.057.928.058a7.655 7.655 0 0 0 4.841-1.733c-1.668-.032-3.13-1.16-3.642-2.805a3.753 3.753 0 0 0 1.76-.07C5.07 13.256 3.76 11.6 3.76 9.676v-.05a3.77 3.77 0 0 0 1.77.505C3.816 8.945 3.288 6.583 4.322 4.737c1.98 2.524 4.9 4.058 8.034 4.22a4.137 4.137 0 0 1 1.128-3.86A3.807 3.807 0 0 1 19 5.274a7.657 7.657 0 0 0 2.475-.98c-.29.934-.9 1.729-1.713 2.233A7.54 7.54 0 0 0 22 5.89a8.084 8.084 0 0 1-1.945 2.093Z" />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M12 3c-2.444 0-2.75.01-3.71.054-.959.044-1.613.196-2.185.418A4.412 4.412 0 0 0 4.51 4.511c-.5.5-.809 1.002-1.039 1.594-.222.572-.374 1.226-.418 2.184C3.01 9.25 3 9.556 3 12s.01 2.75.054 3.71c.044.959.196 1.613.418 2.185.23.592.538 1.094 1.039 1.595.5.5 1.002.808 1.594 1.038.572.222 1.226.374 2.184.418C9.25 20.99 9.556 21 12 21s2.75-.01 3.71-.054c.959-.044 1.613-.196 2.185-.419a4.412 4.412 0 0 0 1.595-1.038c.5-.5.808-1.002 1.038-1.594.222-.572.374-1.226.418-2.184.044-.96.054-1.267.054-3.711s-.01-2.75-.054-3.71c-.044-.959-.196-1.613-.419-2.185A4.412 4.412 0 0 0 19.49 4.51c-.5-.5-1.002-.809-1.594-1.039-.572-.222-1.226-.374-2.184-.418C14.75 3.01 14.444 3 12 3Zm0 1.622c2.403 0 2.688.009 3.637.052.877.04 1.354.187 1.67.31.421.163.72.358 1.036.673.315.315.51.615.673 1.035.123.317.27.794.31 1.671.043.95.052 1.234.052 3.637s-.009 2.688-.052 3.637c-.04.877-.187 1.354-.31 1.67-.163.421-.358.72-.673 1.036a2.79 2.79 0 0 1-1.035.673c-.317.123-.794.27-1.671.31-.95.043-1.234.052-3.637.052s-2.688-.009-3.637-.052c-.877-.04-1.354-.187-1.67-.31a2.789 2.789 0 0 1-1.036-.673 2.79 2.79 0 0 1-.673-1.035c-.123-.317-.27-.794-.31-1.671-.043-.95-.052-1.234-.052-3.637s.009-2.688.052-3.637c.04-.877.187-1.354.31-1.67.163-.421.358-.72.673-1.036.315-.315.615-.51 1.035-.673.317-.123.794-.27 1.671-.31.95-.043 1.234-.052 3.637-.052Z" />
      <path d="M12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm0-7.622a4.622 4.622 0 1 0 0 9.244 4.622 4.622 0 0 0 0-9.244Zm5.884-.182a1.08 1.08 0 1 1-2.16 0 1.08 1.08 0 0 1 2.16 0Z" />
    </svg>
  );
}

export function GitHubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.475 2 2 6.588 2 12.253c0 4.537 2.862 8.369 6.838 9.727.5.09.687-.218.687-.487 0-.243-.013-1.05-.013-1.91C7 20.059 6.35 18.957 6.15 18.38c-.113-.295-.6-1.205-1.025-1.448-.35-.192-.85-.667-.013-.68.788-.012 1.35.744 1.538 1.051.9 1.551 2.338 1.116 2.912.846.088-.666.35-1.115.638-1.371-2.225-.256-4.55-1.14-4.55-5.062 0-1.115.387-2.038 1.025-2.756-.1-.256-.45-1.307.1-2.717 0 0 .837-.269 2.75 1.051.8-.23 1.65-.346 2.5-.346.85 0 1.7.115 2.5.346 1.912-1.333 2.75-1.05 2.75-1.05.55 1.409.2 2.46.1 2.716.637.718 1.025 1.628 1.025 2.756 0 3.934-2.337 4.806-4.562 5.062.362.32.675.936.675 1.897 0 1.371-.013 2.473-.013 2.82 0 .268.188.589.688.486a10.039 10.039 0 0 0 4.932-3.74A10.447 10.447 0 0 0 22 12.253C22 6.588 17.525 2 12 2Z"
      />
    </svg>
  );
}

export function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715zM7.003 8.575a1.546 1.546 0 01-1.548-1.549 1.548 1.548 0 111.547 1.549zm1.336 9.764H5.666V9.75H8.34v8.589zM19.67 3H4.329C3.593 3 3 3.58 3 4.297v15.406C3 20.42 3.594 21 4.328 21h15.338C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3h.003z" />
    </svg>
  );
}

export function GoogleScholarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30.000001"
      preserveAspectRatio="xMidYMid meet"
      {...props}
    >
      <defs>
        <clipPath id="id1">
          <path
            d="M 3.386719 3 L 27.339844 3 L 27.339844 28 L 3.386719 28 Z M 3.386719 3 "
            clipRule="nonzero"
          />
        </clipPath>
      </defs>
      <g clipPath="url(#id1)">
        <path
          d="M 14.660156 3.25 L 3.386719 10.308594 L 11.125 10.308594 C 11.097656 10.417969 11.050781 10.515625 11.027344 10.625 C 10.960938 10.964844 10.910156 11.34375 10.910156 11.734375 C 10.910156 16.773438 16.054688 16.207031 16.054688 16.207031 L 16.054688 17.492188 C 16.054688 18.011719 16.734375 17.832031 16.816406 18.890625 C 16.476562 18.890625 9.691406 18.695312 9.691406 23.277344 C 9.691406 27.882812 15.679688 27.65625 15.679688 27.65625 C 15.679688 27.65625 22.59375 27.964844 22.59375 22.273438 C 22.597656 18.871094 18.636719 17.765625 18.636719 16.398438 C 18.636719 15.015625 21.621094 14.609375 21.621094 11.375 C 21.621094 9.960938 21.523438 8.953125 20.890625 8.238281 C 20.84375 8.1875 20.808594 8.152344 20.761719 8.121094 C 20.75 8.109375 20.738281 8.101562 20.726562 8.09375 L 20.898438 8.09375 L 23.816406 5.902344 L 23.816406 8.898438 C 23.816406 8.953125 23.820312 9.007812 23.832031 9.0625 C 23.609375 9.1875 23.429688 9.363281 23.300781 9.585938 C 23.171875 9.808594 23.109375 10.050781 23.113281 10.308594 L 23.113281 11.722656 C 23.109375 11.910156 23.144531 12.09375 23.214844 12.269531 C 23.285156 12.445312 23.386719 12.597656 23.515625 12.734375 C 23.648438 12.867188 23.804688 12.972656 23.976562 13.042969 C 24.152344 13.117188 24.332031 13.152344 24.519531 13.152344 C 24.710938 13.152344 24.890625 13.117188 25.066406 13.042969 C 25.238281 12.972656 25.390625 12.867188 25.523438 12.734375 C 25.65625 12.597656 25.757812 12.445312 25.828125 12.269531 C 25.898438 12.09375 25.933594 11.910156 25.929688 11.722656 L 25.929688 10.308594 C 25.933594 10.050781 25.871094 9.808594 25.742188 9.585938 C 25.613281 9.363281 25.433594 9.1875 25.207031 9.0625 C 25.21875 9.007812 25.226562 8.953125 25.226562 8.898438 L 25.226562 4.839844 L 27.339844 3.25 Z M 15.632812 7.5625 C 16.039062 7.542969 16.445312 7.640625 16.835938 7.863281 C 17.125 8.007812 17.402344 8.21875 17.644531 8.480469 C 18.148438 8.984375 18.570312 9.714844 18.796875 10.578125 C 19.332031 12.625 18.636719 14.597656 17.191406 14.96875 C 15.765625 15.375 14.171875 14.039062 13.621094 12.007812 C 13.378906 11.015625 13.410156 10.054688 13.6875 9.292969 C 13.691406 9.28125 13.695312 9.273438 13.699219 9.265625 C 13.703125 9.261719 13.710938 9.257812 13.714844 9.253906 C 13.792969 8.953125 13.921875 8.679688 14.082031 8.457031 C 14.371094 8.035156 14.753906 7.746094 15.226562 7.617188 C 15.363281 7.585938 15.496094 7.566406 15.632812 7.5625 Z M 16.183594 19.75 C 18.566406 19.570312 20.597656 20.886719 20.746094 22.675781 C 20.84375 24.449219 19.007812 26.027344 16.605469 26.1875 C 14.222656 26.351562 12.160156 25.050781 12.046875 23.277344 C 11.933594 21.492188 13.78125 19.929688 16.183594 19.75 Z M 16.183594 19.75 "
          fillOpacity="1"
          fillRule="nonzero"
        />
      </g>
    </svg>
  );
}

export function SpotifyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 168 168" {...props}>
      <path
        fill="#1ED760"
        d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l.001-.004zm38.404 120.78a5.217 5.217 0 01-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222 5.222 0 01-6.249-3.93 5.213 5.213 0 013.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35a6.538 6.538 0 014.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-.001zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 015.221-9.771c29.581-8.98 78.756-7.245 109.83 11.202a7.823 7.823 0 012.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z"
      />
    </svg>
  );
}

export function BriefcaseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  );
}
