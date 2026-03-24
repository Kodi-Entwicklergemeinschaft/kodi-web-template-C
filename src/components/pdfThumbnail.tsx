import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { useState, useRef, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from 'react-i18next';

// Set worker path
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PdfThumbnailProps {
  pdfUrl: string;
  size?: number; // Diameter of the circle
}

function PdfThumbnail({ pdfUrl, size = 150 }: PdfThumbnailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const { t } = useTranslation();

  const calculatedScale = size / 600; // Assuming default PDF width ~600px

  useEffect(() => {
    const interval = setInterval(() => {
      const canvas = containerRef.current?.querySelector('canvas');
      if (canvas) {
        canvas.style.width = `${size}px`;
        canvas.style.height = `${size}px`;
        canvas.style.borderRadius = '50%';
        canvas.style.objectFit = 'cover';
        canvas.style.backgroundColor = '#fff'; // Prevent black fill
      }
    }, 100);

    return () => clearInterval(interval);
  }, [size]);

  const onDocumentLoadSuccess = () => {
    setIsLoading(false);
  };

  if (error) {
    return (
      <div
        style={{
          width: size,
          height: size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
          color: '#666',
          border: '1px solid #eee',
          borderRadius: '50%',
        }}
      >
        {t('pdf.error')}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#fff',
      }}
    >
      <Document
        file={pdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={() => setError(true)}
        loading={
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f5f5f5',
            }}
          >
            <CircularProgress size={30} />
          </div>
        }
      >
        <Page
          pageNumber={1}
          scale={calculatedScale}
          renderMode="canvas"
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>

      {isLoading && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255,255,255,0.7)',
          }}
        >
          <CircularProgress size={40} />
        </div>
      )}
    </div>
  );
}

export default PdfThumbnail;
