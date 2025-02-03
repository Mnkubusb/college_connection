"use client";
import { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, Loader2 } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

interface PDFViewerProps {
  url: string;
  scale?: number;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
}

export const PDFViewer = ({ url, scale: initialScale = 1, onZoomIn, onZoomOut }: PDFViewerProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [visiblePages, setVisiblePages] = useState<number[]>([1]);
  const [loading, setLoading] = useState<boolean>(true);
  const [internalScale, setInternalScale] = useState<number>(initialScale);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const pageRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Setup Intersection Observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const page = parseInt(entry.target.getAttribute('data-page-number') || '1');
            setPageNumber(page);
          }
        });
      },
      {
        root: containerRef.current,
        threshold: 0.5, // When 50% of the page is visible
        rootMargin: '-10% 0px' // Adds a small margin to improve accuracy
      }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Calculate initial scale based on container width
  useEffect(() => {
    const calculateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const pageWidth = 595;
        const targetScale = (containerWidth - 48) / pageWidth;
        setInternalScale(Math.min(Math.max(targetScale, 1), 2));
      }
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);

    return () => {
      window.removeEventListener('resize', calculateScale);
    };
  }, []);

  // Function to observe page elements
  const observePage = (element: HTMLDivElement | null, pageNumber: number) => {
    if (element && observerRef.current) {
      element.setAttribute('data-page-number', pageNumber.toString());
      observerRef.current.observe(element);
    }
  };

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setLoading(false);
    setVisiblePages([1, 2, 3].filter(page => page <= numPages));
  }

  const scrollToPage = (page: number) => {
    if (pageRefs.current[page]) {
      const containerTop = containerRef.current?.getBoundingClientRect().top || 0;
      const elementTop = pageRefs.current[page]?.getBoundingClientRect().top || 0;
      const offset = elementTop - containerTop;

      containerRef.current?.scrollBy({
        top: offset,
        behavior: 'smooth'
      });
    } else {
      // If page isn't loaded yet, add it and intermediate pages to visible pages
      setVisiblePages(prev => {
        const newPages = [...prev];
        if (page < Math.min(...prev)) {
          for (let i = page; i <= Math.min(...prev); i++) {
            if (!newPages.includes(i)) newPages.push(i);
          }
        } else {
          for (let i = Math.max(...prev); i <= page; i++) {
            if (!newPages.includes(i)) newPages.push(i);
          }
        }
        return newPages.sort((a, b) => a - b);
      });

      // Wait for the page to be rendered before scrolling
      setTimeout(() => {
        const containerTop = containerRef.current?.getBoundingClientRect().top || 0;
        const elementTop = pageRefs.current[page]?.getBoundingClientRect().top || 0;
        const offset = elementTop - containerTop;

        containerRef.current?.scrollBy({
          top: offset,
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  // Update the scroll handler to be more responsive
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollPosition = container.scrollTop + container.clientHeight;
    const scrollHeight = container.scrollHeight;

    // Load next pages when user scrolls near the bottom
    if (scrollHeight - scrollPosition < 1000) {  // Increased threshold
      const nextPage = Math.max(...visiblePages) + 1;
      if (nextPage <= numPages && !visiblePages.includes(nextPage)) {
        setVisiblePages(prev => [...prev, nextPage, Math.min(nextPage + 1, numPages)]);  // Load two pages at once
      }
    }

    // Load previous pages when user scrolls near the top
    if (container.scrollTop < 1000) {  // Increased threshold
      const prevPage = Math.min(...visiblePages) - 1;
      if (prevPage >= 1 && !visiblePages.includes(prevPage)) {
        setVisiblePages(prev => [prevPage, Math.max(prevPage - 1, 1), ...prev]);  // Load two pages at once
      }
    }
  };

  const handleZoomIn = () => {
    setInternalScale((prev: number) => Math.min(prev + 0.1, 2));
    onZoomIn?.();
  };

  const handleZoomOut = () => {
    setInternalScale((prev: number) => Math.max(prev - 0.1, 0.5));
    onZoomOut?.();
  };

  const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const page = parseInt(e.target.value);
    if (page >= 1 && page <= numPages) {
      setPageNumber(page);
      scrollToPage(page);
    }
  };

  const goToPrevPage = () => {
    const newPage = Math.max(pageNumber - 1, 1);
    setPageNumber(newPage);
    scrollToPage(newPage);
  };

  const goToNextPage = () => {
    const newPage = Math.min(pageNumber + 1, numPages);
    setPageNumber(newPage);
    scrollToPage(newPage);
  };

  return (
    <div className="flex flex-col items-center w-full h-[calc(100vh-6rem)] lg:h-[calc(100vh-3rem)] mb-4 md:mb-0 overflow-hidden">
      {/* Controls - moved outside scrollable container */}
      <div className="w-full flex flex-wrap gap-2 sm:gap-4 items-center justify-center p-2 sm:p-3 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm">
        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            variant="ghost"
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
            className="h-8 px-3 hover:bg-background/90"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-1 sm:gap-2">
            <Input
              type="number"
              min={1}
              max={numPages}
              value={pageNumber}
              onChange={handlePageChange}
              className="w-12 sm:w-14 h-8 text-center bg-transparent border-0 focus-visible:ring-1 p-0 text-sm"
            />
            <span className="text-xs sm:text-sm text-muted-foreground">
              / {numPages}
            </span>
          </div>

          <Button
            variant="ghost"
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
            className="h-8 px-3 hover:bg-background/90"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            variant="ghost"
            onClick={handleZoomOut}
            disabled={internalScale <= 0.5}
            className="h-8 px-3 hover:bg-background/90"
          >
            <ZoomOut className="h-5 w-5" />
          </Button>

          <span className="text-xs sm:text-sm text-muted-foreground min-w-[3rem] text-center">
            {Math.round(internalScale * 100)}%
          </span>

          <Button
            variant="ghost"
            onClick={handleZoomIn}
            disabled={internalScale >= 2}
            className="h-8 px-3 hover:bg-background/90"
          >
            <ZoomIn className="h-5 w-5" />
          </Button>
        </div>

        <Button
          variant="ghost"
          onClick={() => window.open(url, '_blank')}
          className="h-8 px-3 hover:bg-background/90"
        >
          <Download className="h-5 w-5" />
        </Button>
      </div>

      {/* PDF Document container */}
      <div
        ref={containerRef}
        className="relative w-full overflow-auto bg-transparent flex-1"
        onScroll={handleScroll}
      >
        <div className="flex flex-col items-center">
          <Document
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            }
            error={
              <div className="flex items-center justify-center min-h-[calc(100vh-200px)] text-destructive">
                Failed to load PDF file. Please check if the file exists and try again.
              </div>
            }
          >
            {visiblePages.map((page) => (
              <div
                key={page}
                ref={(element) => {
                  observePage(element, page);
                  pageRefs.current[page] = element;
                }}
                className="pdf-page"
              >
                <Page
                  pageNumber={page}
                  scale={internalScale}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className="shadow-lg mb-4"
                  loading={
                    <div className="flex items-center justify-center min-h-[792px]">
                      <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                  }
                />
              </div>
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
}