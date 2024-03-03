import React from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useSearchParams, usePathname } from 'next/navigation'

interface Props {
  path: string,
  curr_page: string | null,
  num_cards: number,
}

const CardPagination: React.FC<Props> = ({ path, curr_page, num_cards }) => {
  const curr = curr_page ? parseInt(curr_page.replace('page=', '')) : 1
  const pages = Math.ceil(num_cards / 100)
  const params = useSearchParams()

  const createPagination = (old_path: string, curr: number) => {
    const path = old_path.replace('page=null', '') + '&'

    const buttons: any = []
    const getEllipsis = () => {
      return <PaginationItem key={crypto.randomUUID()}><PaginationEllipsis /></PaginationItem>
    }

    // Show all page options
    if (pages >= 1 && pages <= 5) {
      for (let i = 1; i <= pages; i++) {
        buttons.push(<PaginationItem key={i}>
          <PaginationLink href={path + `page=${i}`}>{i}</PaginationLink>
        </PaginationItem>)
      }
    }

    // Show first 3-5 pages, ellipsis, last page
    else if (pages > 5 && (curr >= 1 && curr <= 3)) {
      for (let i = 1; i <= curr + 2; i++) {
        buttons.push(<PaginationItem key={i}>
          <PaginationLink href={path + `page=${i}`}>{i}</PaginationLink>
        </PaginationItem>)
      }

      buttons.push(getEllipsis())

      buttons.push(<PaginationItem key={crypto.randomUUID()}>
        <PaginationLink href={path + `page=${pages}`}>{pages}</PaginationLink>
      </PaginationItem>)
    }

    // Show first page, ellipsis, last 3-5 pages
    else if (pages > 5 && (curr >= pages - 2 && curr <= pages)) {
      buttons.push(<PaginationItem>
        <PaginationLink href={path + `page=1`}>1</PaginationLink>
      </PaginationItem>)

      buttons.push(getEllipsis())

      for (let i = pages - 2; i <= pages; i++) {
        buttons.push(<PaginationItem key={i}>
          <PaginationLink href={path + `page=${i}`}>{i}</PaginationLink>
        </PaginationItem>)
      }
    }

    // Show first page, ellipsis, 5 entries (with curr_page) as middle, ellipsis, last page
    else if (pages >= 7) {
      buttons.push(<PaginationItem key={crypto.randomUUID()}>
        <PaginationLink href={path + `page=1`}>1</PaginationLink>
      </PaginationItem>)

      buttons.push(getEllipsis())

      for (let i = curr - 2; i <= curr + 2; i++) {
        buttons.push(<PaginationItem key={i}>
          <PaginationLink href={path + `page=${i}`}>{i}</PaginationLink>
        </PaginationItem>)
      }

      buttons.push(getEllipsis())

      buttons.push(<PaginationItem key={crypto.randomUUID()}>
        <PaginationLink href={path + `page=${pages}`}>{pages}</PaginationLink>
      </PaginationItem>)
    }

    return buttons
  }

  const getNewPath = (new_page: number) => {
    if (new_page < 1 || new_page > pages) return "#"

    const search_params: string[] = []

    const name = params.get('name')
    const edition = params.get('edition')

    if (name) search_params.push('name=' + name)
    if (edition) search_params.push('edition=' + edition)
    search_params.push('page=' + new_page)

    return usePathname() + '?' + search_params.join('&')
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem key="prev">
          <PaginationPrevious href={getNewPath(curr - 1)} />
        </PaginationItem>

        {createPagination(path, curr)}

        <PaginationItem key="next" >
          <PaginationNext href={getNewPath(curr + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default CardPagination